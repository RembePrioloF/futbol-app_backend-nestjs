import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      // Crea un nuevo torneo
      const newTournam = this.tournamRepository.create(tournamDto);
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
    try {
      const existingTournam = await this.tournamRepository.findOne({ where: { tournamId: id.toString() } });
      return existingTournam;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`The Tournam:${id} not found`);
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
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

    if (tournam.isActive === false)
      throw new NotFoundException(`The Tournam:${tournam.name} is already disabled`);

    tournam.isActive = false; // Cambia el estado isActive a false
    await this.tournamRepository.save(tournam); // Guarda la actualización en la base de datos

    return { message: `The Tournam:${tournam.name} disabled` };
  }

}
