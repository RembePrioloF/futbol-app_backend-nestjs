import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MatchDto } from './dto';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @Post()
  createMatch(@Body() matchDto: MatchDto) {
    return this.matchService.createMatch(matchDto);
  }

  @Get()
  findAllMatch() {
    return this.matchService.findAllMatch();
  }

  @Get('/:id')
  findMatchById(@Param('id') id: string) {
    return this.matchService.findMatchById(id);
  }

  @Put('/:id')
  updateMatch(@Param('id') id: string, @Body() matchDto: MatchDto) {
    return this.matchService.updateMatch(id, matchDto);
  }

  @Delete('/:id')
  deleteMatch(@Param('id') id: string) {
    return this.matchService.deleteMatch(id);
  }

  @Patch('/restore/:id')
  restoreMatchent(@Param('id') id: string) {
    return this.matchService.restoreMatchent(id);
  }

}
