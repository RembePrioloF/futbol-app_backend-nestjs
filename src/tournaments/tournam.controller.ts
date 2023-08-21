import { Body, Controller, Post } from '@nestjs/common';
import { TeamDto, TournamDto } from './dto';
import { Team } from './entities/team.entity';
import { TournamService } from './tournam.service';

@Controller('tournam')
export class TournamController {
  constructor(private readonly tournamService: TournamService) { }

  @Post()
  createTournam(@Body() tournamDto: TournamDto) {
    return this.tournamService.createTournam(tournamDto);
  }

  /* @Post('/team')
  createTeam(@Body() teamDto: TeamDto) {
    return this.tournamService.createTeam(teamDto);
  } */

}
