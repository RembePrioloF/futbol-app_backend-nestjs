import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { MatchService } from 'src/matches/match.service';
import { PlayerService } from 'src/players/player.service';
import { Repository } from 'typeorm';
import { PlayerInMatchDto } from './dto';
import { PlayerInMatch } from './entities/player_in_match.entity';

@Injectable()
export class PlayerInMatchService {

  constructor(
    @InjectRepository(PlayerInMatch)
    private readonly playerInMatchRepository: Repository<PlayerInMatch>,
    private readonly matchService: MatchService,
    private readonly playerService: PlayerService,
  ) { }

  async createPlayerInMatch(matchDto: PlayerInMatchDto): Promise<PlayerInMatch> {
    await this.matchService.findMatchById(String(matchDto.match));
    await this.playerService.findPlayerById(String(matchDto.player));
    try {
      // Crea un nuevo partido
      const newMatch = this.playerInMatchRepository.create({
        ...matchDto, id: short(),
      });
      return await this.playerInMatchRepository.save(newMatch);
    } catch (error) {
      console.log(error);
      if (error?.code === 'WARN_DATA_TRUNCATED') {
        throw new HttpException(`¡Este evento: ${matchDto.matchEvent} no existe!`, HttpStatus.BAD_REQUEST);
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllPlayerInMatch(): Promise<PlayerInMatch[]> {
    const matchData = await this.playerInMatchRepository.find({
      relations: ['player.team'],
    });
    if (!matchData || matchData.length == 0) {
      throw new NotFoundException('Partidos no encontrados.');
    }
    return matchData;
  }

  async findPlayerInMatchById(id: string): Promise<PlayerInMatch> {
    const existingMatch = await this.playerInMatchRepository.findOne({
      where: { id: id.toString() },
      relations: ['player.team'],
    });
    if (!existingMatch) {
      throw new NotFoundException(`Evento: ${id} no encontrado`);
    }
    return existingMatch;
  }

  async updatePlayerInMatch(id: string, matchData: Partial<PlayerInMatch>): Promise<PlayerInMatch | undefined> {
    await this.matchService.findMatchById(String(matchData.match));
    await this.playerService.findPlayerById(String(matchData.player));
    const existingMatch = await this.playerInMatchRepository.findOne({
      where: { id: id.toString() }
    });
    if (!existingMatch) {
      throw new NotFoundException(`Evento: ${id} no encontrado`);
    }
    try {
      // Actualiza las propiedades del torneo con los datos proporcionados
      Object.assign(existingMatch, matchData);
      // Guarda los cambios en la base de datos
      const updateMatch = await this.playerInMatchRepository.save(existingMatch);
      return updateMatch;
    } catch (error) {
      console.log(error);
      if (error.code === 'WARN_DATA_TRUNCATED') {
        throw new BadRequestException(`El Evento: ${matchData.matchEvent} not exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async deletePlayerInMatch(id: string) {
    const match = await this.playerInMatchRepository.findOne({ where: { id: id.toString() } });
    if (!match) {
      throw new NotFoundException(`Evento: ${id} no encontrado`);
    }
    await this.playerInMatchRepository.softRemove(match); // Realiza la eliminación lógica
    return { message: `Evento: ${match} deshabilitado` };
  }

  async restoreMatchent(id: string): Promise<PlayerInMatch | undefined> {
    // Busca el partido eliminado lógicamente por su ID
    const matchent = await this.playerInMatchRepository.findOne({
      where: { id: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!matchent) {
      throw new NotFoundException(`Evento: ${id} no encontrado`);
    }
    if (matchent.deleteAt == null) {
      throw new NotFoundException(`Evento: ${id} ya está restaurado.`);
    }
    // Restaura el partido estableciendo deleteAt a null
    matchent.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.playerInMatchRepository.save(matchent);
  }

}
