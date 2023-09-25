import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { ParticipationDto } from './dto';
import { Participation } from './entities/participation.entity';
import { ParticipationService } from './participation.service';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) { }

  @Post()
  createParticipation(@Body() participationDto: Partial<Participation>) {
    return this.participationService.createParticipation(participationDto);
  }

  @Get()
  async findAllParticipation(@Res() response) {
    try {
      const participationData = await this.participationService.findAllParticipation();
      return response.status(HttpStatus.OK).json({
        message: 'All Participationenst data found successfully', participationData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async findParticipationById(@Res() response, @Param('id') id: string) {
    try {
      const existingParticipation = await this.participationService.findParticipationById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Participation found successfully', existingParticipation,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateParticipation(@Res() response, @Param('id') id: string, @Body() participationDto: ParticipationDto) {
    try {
      const existingParticipation = await this.participationService.updateParticipation(id, participationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Participation has been successfully updated',
        existingParticipation,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteParticipation(@Res() response, @Param('id') id: string) {
    try {
      const deletedParticipation = await this.participationService.deleteParticipation(id);
      return response.status(HttpStatus.OK).json({
        message: 'Participation deleted successfully',
        deletedParticipation,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch('/restore/:id')
  async restoreParticipationent(@Res() response, @Param('id') id: string) {
    try {
      const participationData = await this.participationService.restoreParticipationent(id);
      return response.status(HttpStatus.OK).json({
        message: 'Participationent successfully restored', participationData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
