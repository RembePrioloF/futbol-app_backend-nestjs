import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { TournamDto } from './dto';
import { League } from './dto/league.enum';
import { TournamService } from './tournam.service';

@Controller('tournam')
export class TournamController {
  constructor(private readonly tournamService: TournamService) { }

  // Ruta para obtener los valores del enum
  @Get('/league')
  getLeague() {
    return Object.values(League);
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
  async updateTournam(@Res() response, @Param('id') id: string, @Body() tournamDto: TournamDto) {
    try {
      const existingTournam = await this.tournamService.updateTournam(id, tournamDto);
      return response.status(HttpStatus.OK).json({
        message: 'Tournam has been successfully updated',
        existingTournam,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteTournam(@Res() response, @Param('id') id: string) {
    try {
      const deletedTournam = await this.tournamService.deleteTournam(id);
      return response.status(HttpStatus.OK).json({
        message: 'Tournam deleted successfully',
        deletedTournam,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/restore/:id')
  async restoreTournament(@Res() response, @Param('id') id: string) {
    try {
      const tournamData = await this.tournamService.restoreTournament(id);
      return response.status(HttpStatus.OK).json({
        message: 'Tournament successfully restored', tournamData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
