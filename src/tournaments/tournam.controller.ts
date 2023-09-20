import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TournamDto } from './dto';
import { TournamService } from './tournam.service';

@Controller('tournam')
export class TournamController {
  constructor(private readonly tournamService: TournamService) { }

  @Post()
  createTournam(@Body() tournamDto: TournamDto) {
    return this.tournamService.createTournam(tournamDto);
  }

  @Get()
  async findAllTournam(@Res() response) {
    try {
      const tournamData = await this.tournamService.findAllTournam();
      return response.status(HttpStatus.OK).json({
        message: 'All Tournamenst data found successfully', tournamData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async findTournamById(@Res() response, @Param('id') id: string) {
    try {
      const existingTournam = await this.tournamService.findTournamById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Tournam found successfully', existingTournam,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
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

}
