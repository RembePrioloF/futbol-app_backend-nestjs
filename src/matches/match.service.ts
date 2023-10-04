import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { TeamService } from 'src/teams/team.service';
import { Repository } from 'typeorm';
import { TournamService } from '../tournaments/tournam.service';
import { MatchDto } from './dto';
import { Match } from './entities/Match.entity';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly tournamService: TournamService,
    private readonly teamService: TeamService,
  ) { }

  async createMatch(matchDto: MatchDto): Promise<Match> {
    const { dateMatch, localTeam, visitingTeam, tournam } = matchDto;
    // Verifica si el torneo existe antes de crear el partido
    await this.tournamService.findTournamById(String(tournam));
    await this.teamService.findTeamById(String(localTeam));
    await this.teamService.findTeamById(String(visitingTeam));
    if (matchDto.localTeam === matchDto.visitingTeam) {
      throw new BadRequestException('The team are duplicated');
    }
    try {
      // Crea un nuevo partido
      const newMatch = this.matchRepository.create({
        ...matchDto, id: short(),
      });
      return await this.matchRepository.save(newMatch);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Match:${matchDto.dateMatch} :${matchDto.localTeam} :${matchDto.visitingTeam} already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllMatch(): Promise<Match[]> {
    const matchData = await this.matchRepository.find();
    if (!matchData || matchData.length == 0) {
      throw new NotFoundException('Matchents data not found!');
    }
    return matchData;
  }

  async findMatchById(id: string): Promise<Match> {
    const existingMatch = await this.matchRepository.findOne({
      where: { id: id.toString() },
      relations: ['localTeam', 'visitingTeam', 'tournam'],
    });
    if (!existingMatch) {
      throw new NotFoundException(`The Match:${id} not found`);
    }
    return existingMatch;
  }

  async updateMatch(id: string, matchData: Partial<Match>): Promise<Match | undefined> {
    const existingMatch = await this.matchRepository.findOne({
      where: { id: id.toString() }
    });
    if (!existingMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    try {
      // Actualiza las propiedades del torneo con los datos proporcionados
      Object.assign(existingMatch, matchData);
      // Guarda los cambios en la base de datos
      const updateMatch = await this.matchRepository.save(existingMatch);
      return updateMatch;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Match already exists!`)
      }
      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        throw new BadRequestException(`The Match1: not exists!`)
      }
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(`The Match2: not exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async deleteMatch(id: string) {
    const match = await this.matchRepository.findOne({ where: { id: id.toString() } });
    if (!match) {
      throw new NotFoundException(`The Match:${id} not found`);
    }
    await this.matchRepository.softRemove(match); // Realiza la eliminación lógica
    return { message: `The Match:${match} disabled` };
  }

  async restoreMatchent(id: string): Promise<Match | undefined> {
    // Busca el partido eliminado lógicamente por su ID
    const matchent = await this.matchRepository.findOne({
      where: { id: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!matchent) {
      throw new NotFoundException(`Matchent with ID ${id} not found.`);
    }
    if (matchent.deleteAt == null) {
      throw new NotFoundException(`Matchent with ID ${id} already restored.`);
    }
    // Restaura el partido estableciendo deleteAt a null
    matchent.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.matchRepository.save(matchent);
  }

}
