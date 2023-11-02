import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TeamDto } from './dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post()
  createTeam(@Body() teamDto: TeamDto) {
    return this.teamService.createTeam(teamDto);
  }

  @Get()
  findAllTeam() {
    return this.teamService.findAllTeam();
  }

  @Get('/:id')
  findTeamById(@Param('id') id: string) {
    return this.teamService.findTeamById(id);
  }

  @Put('/:id')
  updateTeam(@Param('id') id: string, @Body() teamDto: TeamDto) {
    return this.teamService.updateTeam(id, teamDto);
  }

  @Delete('/:id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }

  @Patch('/restore/:id')
  restoreTeam(@Param('id') id: string) {
    return this.teamService.restoreTeam(id);
  }

}
