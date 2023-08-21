import { Body, Controller, Post } from '@nestjs/common';
import { PlayerDto } from './dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Post()
  createTeam(@Body() playerDto: PlayerDto) {
    return this.playerService.createPlayer(playerDto);
  }

}
