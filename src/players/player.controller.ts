import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
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
  updatePlayer(@Param('id') id: string, @Body() playerDto: PlayerDto) {
    return this.playerService.updatePlayer(id, playerDto);
  }

  @Delete('/:id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }

  @Patch('/restore/:id')
  restorePlayer(@Param('id') id: string) {
    return this.playerService.restorePlayer(id);
  }

}
