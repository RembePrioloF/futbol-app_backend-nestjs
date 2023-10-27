import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { Repository } from 'typeorm';
import { TeamDto } from './dto';
import { Team } from './entities/team.entity';
import { TournamService } from 'src/tournaments/tournam.service';

@Injectable()
export class TeamService {

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly tournamService: TournamService,
  ) { }

  async createTeam(teamDto: TeamDto): Promise<Team> {
    const existingTournam = await this.tournamService.findTournamById(String(teamDto.tournam));
    if (!existingTournam) {
      throw new NotFoundException(`Tournam with ID ${teamDto.tournam} not found.`);
    }
    try {
      // Crea un nuevo equipo
      const newTeam = this.teamRepository.create({
        ...teamDto,
        teamId: short(),
      });
      return await this.teamRepository.save(newTeam);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The team: ${teamDto.name} already exists!`)
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
    const existingTeam = await this.teamRepository.findOne({
      where: { teamId: id.toString() },
      relations: ['tournam','players'],
    });
    if (!existingTeam)
      throw new NotFoundException(`The Team: ${id} not found`);
    return existingTeam;
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
    await this.teamRepository.softRemove(team); // Realiza la eliminación lógica
    return { message: `The Team:${team.name} disabled` };
  }

  async restoreTeam(id: string): Promise<Team | undefined> {
    // Busca el Team eliminado lógicamente por su ID
    const team = await this.teamRepository.findOne({
      where: { teamId: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found.`);
    }
    if (team.deleteAt == null) {
      throw new NotFoundException(`Team with ID ${id} already restored.`);
    }
    // Restaura el Team estableciendo deleteAt a null
    team.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.teamRepository.save(team);
  }

}
