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
    const { name, playerNumber, birthDate, email, team } = playerDto;
    // Verifica si el equipo existe en la base de datos
    const existingTeam = await this.teamService.findTeamById(String(team));
    try {
      const league = existingTeam.tournam?.league;
      const existingPlayer = await this.playerRepository.findOne({
        where: [{ playerNumber }, { email }],
      });
      if (existingPlayer) {
        if (existingPlayer.email === email) {
          throw new BadRequestException(`Ya existe un jugador con el correo electrónico: ${email}.`);
        }
      }
      const birthDateObj = new Date(birthDate);
      // Calcula la fecha actual
      const presentDate = new Date();
      // Calcula la edad del jugador restando el año de nacimiento del año actual
      const age = presentDate.getFullYear() - birthDateObj.getFullYear();
      // Verifica si el jugador tiene al menos 18 años
      if (age < 18 && league === 'VETERANO') {
        throw new BadRequestException(`El jugador: ${name}. es menor de edad y no puede unirse a una liga de adultos.`);
      }
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
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`El Número ' ${playerNumber} ' ya está asignado`)
      } else {
        // Ocurrió un error interno
        throw new InternalServerErrorException('Something terrible happened while creating the player.');
      }
    }
  }

  async findAllPlayer(): Promise<Player[]> {
    const playerData = await this.playerRepository.find({
      order: { createdAt: 'ASC' },
    });
    if (!playerData || playerData.length == 0) {
      throw new NotFoundException('¡No se encontraron datos de jugadores!');
    }
    return playerData;
  }

  async findPlayerById(id: string): Promise<Player> {
    const existingPlayer = await this.playerRepository.findOne({
      where: { playerId: id.toString() },
      relations: ['team.participations.tournam', 'playerInMatches'],
    });
    if (!existingPlayer) {
      throw new NotFoundException(`Jugador no encontrado`);
    }
    return existingPlayer;
  }

  async updatePlayer(id: string, playerDto: Partial<Player>): Promise<Player | undefined> {
    const { position, playerNumber, email, team } = playerDto;
    await this.teamService.findTeamById(String(team));
    const existingPlayer = await this.playerRepository.findOne({
      where: [{ playerId: id.toString() }, { playerNumber }, { email }]
    });
    if (!existingPlayer) {
      throw new NotFoundException(`El jugador: ${id} no encontrado`);
    }
    if (existingPlayer) {
      if (existingPlayer.email === email) {
        throw new BadRequestException(`Ya existe un jugador con el correo electrónico: ${email}.`);
      }
      if (existingPlayer.playerNumber === playerNumber) {
        throw new BadRequestException(`El Número del Jugador: ${playerNumber} ¡ya existe!`)
      }
    }
    try {
      // Actualiza las propiedades del jugador con los datos proporcionados
      Object.assign(existingPlayer, playerDto);
      // Guarda los cambios en la base de datos
      const updatePlayer = await this.playerRepository.save(existingPlayer);
      // Devuelve el jugador actualizado sin la fecha de creación
      const playerWithout: Player = { ...updatePlayer };
      delete playerWithout.createdAt;
      return playerWithout;
    } catch (error) {
      console.log(error);
      if (error?.code === 'WARN_DATA_TRUNCATED') {
        throw new HttpException(`¡La posición: ${position} no existe!`, HttpStatus.BAD_REQUEST);
      }
      else {
        // Ocurrió un error interno
        throw new InternalServerErrorException('Something terrible happened while creating the player.');
      }
    }
  }

  async deletePlayer(id: string) {
    const player = await this.playerRepository.findOne({
      where: { playerId: id.toString() }
    });
    if (!player) {
      throw new NotFoundException(`El jugador: ${id} no encontrado`);
    }
    await this.playerRepository.softRemove(player); // Realiza la eliminación lógica
    return { message: `El jugador: ${Player.name} deshabilitado` };
  }

  async restorePlayer(id: string): Promise<Player | undefined> {
    // Busca el Player eliminado lógicamente por su ID
    const player = await this.playerRepository.findOne({
      where: { playerId: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!player) {
      throw new NotFoundException(`El jugador: ${id} no encontrado`);
    }
    if (player.deleteAt == null) {
      throw new NotFoundException(`El jugador: ${id} ya ha sido restaurado.`);
    }
    // Restaura el Player estableciendo deleteAt a null
    player.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.playerRepository.save(player);
  }

}
