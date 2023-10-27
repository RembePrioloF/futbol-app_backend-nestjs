import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { PlayerDto, Positions } from './dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  // Ruta para obtener los valores del enum
  @Get('/positions')
  getLeague() {
    return Object.values(Positions);
  }

  @Post()
  createPlayer(@Body() PlayerDto: PlayerDto) {
    return this.playerService.createPlayer(PlayerDto);
  }

  @Get()
  findAllPlayer() {
    return this.playerService.findAllPlayer();
  }

  @Get('/:id')
  findPlayerById(@Param('id') id: string) {
    return this.playerService.findPlayerById(id);
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
