import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
import { MatchDto } from './dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @Post()
  createMatch(@Param('id') id: string, @Body() matchDto: Partial<Match>[]) {
    return this.matchService.createMatch(id, matchDto);
  }

  @Get()
  async findAllMatch(@Res() response) {
    try {
      const matchData = await this.matchService.findAllMatch();
      return response.status(HttpStatus.OK).json({
        message: 'All Matchenst data found successfully', matchData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async findMatchById(@Res() response, @Param('id') id: string) {
    try {
      const existingMatch = await this.matchService.findMatchById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Match found successfully', existingMatch,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateMatch(@Res() response, @Param('id') id: string, @Body() matchDto: MatchDto) {
    try {
      const existingMatch = await this.matchService.updateMatch(id, matchDto);
      return response.status(HttpStatus.OK).json({
        message: 'Match has been successfully updated',
        existingMatch,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteMatch(@Res() response, @Param('id') id: string) {
    try {
      const deletedMatch = await this.matchService.deleteMatch(id);
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
      const MatchData = await this.matchService.restoreMatchent(id);
      return response.status(HttpStatus.OK).json({
        message: 'Matchent successfully restored', MatchData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
