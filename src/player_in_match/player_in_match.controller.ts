import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { PlayerInMatch } from './entities/player_in_match.entity';
import { PlayerInMatchService } from './player_in_match.service';
import { PlayerInMatchDto } from './dto';

@Controller('player_in_match')
export class PlayerInMatchController {
  constructor(private readonly playerInMatchService: PlayerInMatchService) { }

  @Post()
  createPlayerInMatch(@Body() playerInMatchDto: PlayerInMatchDto) {
    return this.playerInMatchService.createPlayerInMatch(playerInMatchDto);
  }

  @Get()
  async findAllPlayerInMatch(@Res() response) {
    try {
      const matchData = await this.playerInMatchService.findAllPlayerInMatch();
      return response.status(HttpStatus.OK).json({
        message: 'All Matchenst data found successfully', matchData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async findPlayerInMatchById(@Res() response, @Param('id') id: string) {
    try {
      const existingMatch = await this.playerInMatchService.findPlayerInMatchById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Match found successfully', existingMatch,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updatePlayerInMatch(@Res() response, @Param('id') id: string, @Body() playerInMatchDto: PlayerInMatchDto) {
    try {
      const existingMatch = await this.playerInMatchService.updatePlayerInMatch(id, playerInMatchDto);
      return response.status(HttpStatus.OK).json({
        message: 'Match has been successfully updated',
        existingMatch,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deletePlayerInMatch(@Res() response, @Param('id') id: string) {
    try {
      const deletedMatch = await this.playerInMatchService.deletePlayerInMatch(id);
      return response.status(HttpStatus.OK).json({
        message: 'Match deleted successfully',
        deletedMatch,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/restore/:id')
  async restoreMatchent(@Res() response, @Param('id') id: string) {
    try {
      const MatchData = await this.playerInMatchService.restoreMatchent(id);
      return response.status(HttpStatus.OK).json({
        message: 'Matchent successfully restored', MatchData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
