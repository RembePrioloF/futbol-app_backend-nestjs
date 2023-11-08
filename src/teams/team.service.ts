import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { TournamService } from 'src/tournaments/tournam.service';
import { Repository } from 'typeorm';
import { TeamDto } from './dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly tournamService: TournamService,
  ) { }

  async createTeam(teamDto: TeamDto): Promise<Team> {
    await this.tournamService.findTournamById(String(teamDto.tournam));
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
        throw new BadRequestException(`El equipo: ${teamDto.name} ¡ya existe!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllTeam(): Promise<Team[]> {
    const teamData = await this.teamRepository.find({
      relations: ['tournam'],
    });
    if (!teamData || teamData.length == 0) {
      throw new NotFoundException('¡No se han encontrado datos de equipos!');
    }
    return teamData;
  }

  async findTeamById(id: string): Promise<Team> {
    const existingTeam = await this.teamRepository.findOne({
      where: { teamId: id.toString() },
      relations: ['tournam', 'players'],
    });
    if (!existingTeam)
      throw new NotFoundException(`Equipo: ${id} no encontrado`);
    return existingTeam;
  }

  async updateTeam(id: string, teamData: Partial<Team>): Promise<Team | undefined> {
    const existingTeam = await this.teamRepository.findOne({ where: { teamId: id.toString() } });
    if (!existingTeam) {
      throw new NotFoundException(`El Equipo: ${id} no encontrado`);
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
      throw new NotFoundException(`El Equipo: ${id} no encontrado`);
    }
    await this.teamRepository.softRemove(team); // Realiza la eliminación lógica
    return { message: `El equipo:${team.name} deshabilitado` };
  }

  async restoreTeam(id: string): Promise<Team | undefined> {
    // Busca el Team eliminado lógicamente por su ID
    const team = await this.teamRepository.findOne({
      where: { teamId: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!team) {
      throw new NotFoundException(`El Equipo: ${id} no encontrado`);
    }
    if (team.deleteAt == null) {
      throw new NotFoundException(`El equipo con ID: ${id} ya está restaurado.`);
    }
    // Restaura el Team estableciendo deleteAt a null
    team.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.teamRepository.save(team);
  }

}
