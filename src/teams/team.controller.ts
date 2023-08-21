import { Body, Controller, Post } from '@nestjs/common';
import { PlayerDto, TeamDto } from './dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Post()
  createTeam(@Body() teamDto: TeamDto) {
    return this.teamService.createTeam(teamDto);
  }

}
