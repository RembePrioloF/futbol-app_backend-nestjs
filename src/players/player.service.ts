import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { TeamService } from 'src/teams/team.service';
import { Repository } from 'typeorm';
import { PlayerDto } from './dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly teamService: TeamService,
  ) { }

  async createPlayer(playerDto: PlayerDto): Promise<Player> {
    const { name, playerNumber, birthDate, email, phone, team } = playerDto;
    // Verifica si el equipo existe en la base de datos
    const existingTeam = await this.teamService.findTeamById(String(team));
    // Si el equipo no se encuentra, lanza una excepción
    if (!existingTeam) {
      throw new NotFoundException(`Team with ID ${team} not found.`);
    }
    try {
      const league = existingTeam.participations[0]?.tournam?.league;
      const existingPlayer = await this.playerRepository.findOne({
        where: [{ name }, { playerNumber }, { email }, { phone }],
      });
      if (existingPlayer) {
        if (existingPlayer.name === name) {
          throw new BadRequestException(`A player with the Name:${name} already exists.`);
        }
        if (existingPlayer.playerNumber === playerNumber) {
          throw new BadRequestException(`A player with the Number:${playerNumber} already exists.`);
        }
        if (existingPlayer.email === email) {
          throw new BadRequestException(`A player with the Email:${email} already exists.`);
        }
        if (existingPlayer.phone === phone) {
          throw new BadRequestException(`A player with the Cellphone:${phone} already exists.`);
        }
      }
      const birthDateObj = new Date(birthDate);
      // Calcula la fecha actual
      const presentDate = new Date();
      // Calcula la edad del jugador restando el año de nacimiento del año actual
      const age = presentDate.getFullYear() - birthDateObj.getFullYear();
      // Verifica si el jugador tiene al menos 18 años
      if (age < 18 && league === 'VETERANO') {
        throw new BadRequestException(`The player: ${name} is a minor and cannot join an adult league.`);
      }
      // Crea un nuevo jugador
      const newPlayer = this.playerRepository.create({
        ...playerDto,
        playerId: short(),
      });
      return await this.playerRepository.save(newPlayer);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        // El jugador ya existe, relanzar la excepción
        throw error;
      } {
        // Ocurrió un error interno
        throw new InternalServerErrorException('Something terrible happened while creating the player.');
      }
    }
  }

  async findAllPlayer(): Promise<Player[]> {
    const playerData = await this.playerRepository.find();
    if (!playerData || playerData.length == 0) {
      throw new NotFoundException('Players data not found!');
    }
    return playerData;
  }

  async findPlayerById(id: string): Promise<Player> {
    const existingPlayer = await this.playerRepository.findOne({
      where: { playerId: id.toString() },
      relations: ['team.participations.tournam', 'playerInMatches'],
    });
    if (!existingPlayer) {
      throw new NotFoundException(`The Player:${id} not found`);
    }
    return existingPlayer;
  }

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player | undefined> {
    const existingPlayer = await this.playerRepository.findOne({ where: { playerId: id.toString() } });
    if (!existingPlayer) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    try {
      // Actualiza las propiedades del jugador con los datos proporcionados
      Object.assign(existingPlayer, playerData);
      // Guarda los cambios en la base de datos
      const updatePlayer = await this.playerRepository.save(existingPlayer);
      // Devuelve el jugador actualizado sin la fecha de creación
      const playerWithout: Player = { ...updatePlayer };
      delete playerWithout.createdAt;
      return playerWithout;
    } catch (error) {
      console.log(error);
      if (error?.code === 'WARN_DATA_TRUNCATED') {
        throw new HttpException(`The position:${playerData.position} not exists!`, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async deletePlayer(id: string) {
    const player = await this.playerRepository.findOne({
      where: { playerId: id.toString() }
    });
    if (!player) {
      throw new NotFoundException(`The Player:${id} not found`);
    }
    await this.playerRepository.softRemove(player); // Realiza la eliminación lógica
    return { message: `The Player:${Player.name} disabled` };
  }

  async restorePlayer(id: string): Promise<Player | undefined> {
    // Busca el Player eliminado lógicamente por su ID
    const player = await this.playerRepository.findOne({
      where: { playerId: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found.`);
    }
    if (player.deleteAt == null) {
      throw new NotFoundException(`Player with ID ${id} already restored.`);
    }
    // Restaura el Player estableciendo deleteAt a null
    player.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.playerRepository.save(player);
  }

}
