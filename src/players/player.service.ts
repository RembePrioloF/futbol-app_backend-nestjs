import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerDto } from './dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) { }

  async createPlayer(playerDto: PlayerDto): Promise<Player> {
    try {
      // Verificar si ya existe un jugador con el mismo nombre y playerNumber
      const existingPlayer = await this.playerRepository.findOne({
        where: [
          { name: playerDto.name },
          { playerNumber: playerDto.playerNumber }
        ]
      });
      if (existingPlayer) {
        if (existingPlayer.name === playerDto.name) {
          throw new BadRequestException(`A player with the Name:${playerDto.name} already exists.`);
        }
        if (existingPlayer.playerNumber === playerDto.playerNumber) {
          throw new BadRequestException(`A player with the Number:${playerDto.playerNumber} already exists.`);
        }
      }
      // Crea un nuevo jugador
      const newPlayer = this.playerRepository.create(playerDto);
      return await this.playerRepository.save(newPlayer);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        // El jugador ya existe, relanzar la excepción
        throw error;
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The team:${playerDto.name} already exists!`)
      }
      if (error?.code === 'WARN_DATA_TRUNCATED') {
        throw new HttpException(`The position:${playerDto.position} not exists!`, HttpStatus.BAD_REQUEST);
      }
      if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new HttpException(`This team doesn't exist!`, HttpStatus.BAD_REQUEST);
      } else {
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
      relations: ['team'], // Esto carga automáticamente la relación con el equipo
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
