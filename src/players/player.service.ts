import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { PlayerDto } from './dto';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) { }

  async createPlayer(playerDto: PlayerDto): Promise<Player> {
    
    try {
      // Crea un nuevo jugador
      const newPlayer = this.playerRepository.create(playerDto);
      return await this.playerRepository.save(newPlayer);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Player:${playerDto.name} already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
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
    try {
      const existingPlayer = await this.playerRepository.findOne({ where: { playerId: id.toString() } });
      return existingPlayer;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`The Player:${id} not found`);
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player | undefined> {
    const existingPlayer = await this.playerRepository.findOne({ where: { playerId: id.toString() } });
    if (!existingPlayer) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    // Actualiza las propiedades del jugador con los datos proporcionados
    Object.assign(existingPlayer, playerData);
    // Guarda los cambios en la base de datos
    const updatePlayer = await this.playerRepository.save(existingPlayer);
    // Devuelve el jugador actualizado sin la fecha de creación
    const playerWithout: Player = { ...updatePlayer };
    delete playerWithout.createdAt;
    return playerWithout;
  }

  async deletePlayer(id: string) {
    const player = await this.playerRepository.findOne({ where: { playerId: id.toString() } });
    if (!player) {
      throw new NotFoundException(`The Player:${id} not found`);
    }

    if (player.isActive === false)
      throw new NotFoundException(`The Player:${Player.name} is already disabled`);

    player.isActive = false; // Cambia el estado isActive a false
    await this.playerRepository.save(player); // Guarda la actualización en la base de datos

    return { message: `The Player:${Player.name} disabled` };
  }

}
