import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TournamDto } from './dto';
import { Leagues } from './dto/leagues.enum';
import { Locations } from './dto/locations.enum';
import { TournamService } from './tournam.service';

@Controller('tournam')
export class TournamController {
  constructor(private readonly tournamService: TournamService) { }

  // Ruta para obtener los valores del enum
  @Get('/leagues')
  getLeague() {
    return Object.values(Leagues);
  }
  @Get('/locations')
  getLocation() {
    return Object.values(Locations);
  }

  @Post()
  createTournam(@Body() tournamDto: TournamDto) {
    return this.tournamService.createTournam(tournamDto);
  }

  @Get()
  findAllTournam() {
    return this.tournamService.findAllTournam();
  }

  @Get('/:id')
  findTournamById(@Param('id') id: string) {
    return this.tournamService.findTournamById(id);
  }

  @Put('/:id')
  updateTournam(@Param('id') id: string, @Body() tournamDto: TournamDto) {
    return this.tournamService.updateTournam(id, tournamDto);
  }

  @Delete('/:id')
  deleteTournam(@Param('id') id: string) {
    return this.tournamService.deleteTournam(id);
  }

  @Patch('/restore/:id')
  restoreTournament(@Param('id') id: string) {
    return this.tournamService.restoreTournament(id);
  }

}
