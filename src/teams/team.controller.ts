import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
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
  async updateTeam(@Res() response, @Param('id') id: string, @Body() teamDto: TeamDto) {
    try {
      const existingTeam = await this.teamService.updateTeam(id, teamDto);
      return response.status(HttpStatus.OK).json({
        message: 'Team has been successfully updated',
        existingTeam,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteTeam(@Res() response, @Param('id') id: string) {
    try {
      const deletedTeam = await this.teamService.deleteTeam(id);
      return response.status(HttpStatus.OK).json({
        message: 'Team deleted successfully',
        deletedTeam,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/restore/:id')
  async restoreTeam(@Res() response, @Param('id') id: string) {
    try {
      const teamData = await this.teamService.restoreTeam(id);
      return response.status(HttpStatus.OK).json({
        message: 'Team successfully restored', teamData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
