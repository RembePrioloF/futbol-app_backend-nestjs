import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { PlayerDto } from './dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Post()
  async createPlayer(@Body() PlayerDto: PlayerDto) {
    const data = await this.playerService.createPlayer(PlayerDto);
    return { message: 'User create', data };
  }

  @Get()
  async findAllPlayer(@Res() response) {
    try {
      const playerData = await this.playerService.findAllPlayer();
      return response.status(HttpStatus.OK).json({
        message: 'All Players data found successfully', playerData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async findPlayerById(@Res() response, @Param('id') id: string) {
    try {
      const existingPlayer = await this.playerService.findPlayerById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Player found successfully', existingPlayer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updatePlayer(@Res() response, @Param('id') id: string, @Body() playerDto: PlayerDto) {
    try {
      const existingPlayer = await this.playerService.updatePlayer(id, playerDto);
      return response.status(HttpStatus.OK).json({
        message: 'Player has been successfully updated',
        existingPlayer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deletePlayer(@Res() response, @Param('id') id: string) {
    try {
      const deletedPlayer = await this.playerService.deletePlayer(id);
      return response.status(HttpStatus.OK).json({
        message: 'Player deleted successfully',
        deletedPlayer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/restore/:id')
  async restorePlayer(@Res() response, @Param('id') id: string) {
    try {
      const playerData = await this.playerService.restorePlayer(id);
      return response.status(HttpStatus.OK).json({
        message: 'Player successfully restored', playerData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
