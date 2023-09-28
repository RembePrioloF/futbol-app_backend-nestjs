import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { Repository } from 'typeorm';
import { TournamDto } from './dto';
import { Tournam } from './entities/tournam.entity';

@Injectable()
export class TournamService {

  constructor(
    @InjectRepository(Tournam)
    private readonly tournamRepository: Repository<Tournam>,
  ) { }

  async createTournam(tournamDto: TournamDto): Promise<Tournam> {
    try {
      const newTournam = this.tournamRepository.create({
        ...tournamDto,
        tournamId: short(),
      });
      return await this.tournamRepository.save(newTournam);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Tournam:${tournamDto.name} already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllTournam(): Promise<Tournam[]> {
    const tournamData = await this.tournamRepository.find();
    if (!tournamData || tournamData.length == 0) {
      throw new NotFoundException('Tournaments data not found!');
    }
    return tournamData;
  }

  async findTournamById(id: string): Promise<Tournam> {
    const existingTournam = await this.tournamRepository.findOne({
      where: { tournamId: id.toString() }
    });
    if (!existingTournam) {
      throw new NotFoundException(`The Tournam:${id} not found`);
    }
    return existingTournam;
  }

  async updateTournam(id: string, tournamData: Partial<Tournam>): Promise<Tournam | undefined> {
    const existingTournam = await this.tournamRepository.findOne({ where: { tournamId: id.toString() } });
    if (!existingTournam) {
      throw new NotFoundException(`Tournam with ID ${id} not found`);
    }
    // Actualiza las propiedades del torneo con los datos proporcionados
    Object.assign(existingTournam, tournamData);
    // Guarda los cambios en la base de datos
    const updateTournam = await this.tournamRepository.save(existingTournam);
    // Devuelve el torneo actualizado sin la fecha de creación
    const tournamWithout: Tournam = { ...updateTournam };
    delete tournamWithout.createdAt;
    return tournamWithout;
  }

  async deleteTournam(id: string) {
    const tournam = await this.tournamRepository.findOne({ where: { tournamId: id.toString() } });
    if (!tournam) {
      throw new NotFoundException(`The Tournam:${id} not found`);
    }
    await this.tournamRepository.softRemove(tournam); // Realiza la eliminación lógica
    return { message: `The Tournam:${tournam.name} disabled` };
  }

  async restoreTournament(id: string): Promise<Tournam | undefined> {
    // Busca el torneo eliminado lógicamente por su ID
    const tournament = await this.tournamRepository.findOne({
      where: { tournamId: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found.`);
    }
    if (tournament.deleteAt == null) {
      throw new NotFoundException(`Tournament with ID ${id} already restored.`);
    }
    // Restaura el torneo estableciendo deleteAt a null
    tournament.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.tournamRepository.save(tournament);
  }

}
