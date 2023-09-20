import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamDto } from './dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) { }

  async createTeam(teamDto: TeamDto): Promise<Team> {
    try {
      // Crea un nuevo equipo
      const newTeam = this.teamRepository.create(teamDto);
      return await this.teamRepository.save(newTeam);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The team #${teamDto.name} already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllTeam(): Promise<Team[]> {
    const teamData = await this.teamRepository.find();
    if (!teamData || teamData.length == 0) {
      throw new NotFoundException('Teams data not found!');
    }
    return teamData;
  }

  async findTeamById(id: string): Promise<Team> {
    try {
      const existingTeam = await this.teamRepository.findOne({ where: { teamId: id.toString() } });
      return existingTeam;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`Team #${id} not found`);
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async updateTeam(id: string, teamData: Partial<Team>): Promise<Team | undefined> {
    const existingTeam = await this.teamRepository.findOne({ where: { teamId: id.toString() } });
    if (!existingTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    // Actualiza las propiedades del equipo con los datos proporcionados
    Object.assign(existingTeam, teamData);
    // Guarda los cambios en la base de datos
    const updateTeam = await this.teamRepository.save(existingTeam);
    // Devuelve el equipo actualizado sin la fecha de creación
    const teamWithout: Team = { ...updateTeam };
    delete teamWithout.createdAt;
    return teamWithout;
  }

  async deleteTeam(id: string) {
    const team = await this.teamRepository.findOne({ where: { teamId: id.toString() } });
    if (!team) {
      throw new NotFoundException(`The Team:${id} not found`);
    }

    if (team.isActive === false)
      throw new NotFoundException(`The Team:${team.name} is already disabled`);

    team.isActive = false; // Cambia el estado isActive a false
    await this.teamRepository.save(team); // Guarda la actualización en la base de datos

    return { message: `The Team:${team.name} disabled` };
  }

}
