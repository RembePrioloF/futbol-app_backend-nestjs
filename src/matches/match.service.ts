import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/Match.entity';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) { }

  async createMatch(id: string, matchDto: Partial<Match>[]): Promise<Match[]> {
    const existingMatch = await this.matchRepository.findOne({
      where: { id: id.toString() }
    });
    if (!existingMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    try {
      // Crea un nuevo partido
      const newMatch = this.matchRepository.create(matchDto);
      return await this.matchRepository.save(newMatch);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Match:${matchDto} already exists!`)
      } if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(`The team not exists!`)
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
        throw new BadRequestException(`The Tournam:${matchData.tournam} not exists!`)
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
