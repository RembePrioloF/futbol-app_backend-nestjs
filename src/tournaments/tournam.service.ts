import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generate as short } from 'short-uuid';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { TournamDto } from './dto';
import { Tournam } from './entities/tournam.entity';

@Injectable()
export class TournamService {

  constructor(
    @InjectRepository(Tournam)
    private readonly tournamRepository: Repository<Tournam>,
    private readonly authService: AuthService,
  ) { }

  async createTournam(tournamDto: TournamDto): Promise<Tournam> {
    const existingUser = await this.authService.findUserById(String(tournamDto.user));
    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID: ${tournamDto.user} no encontrado.`);
    }
    try {
      const newTournam = this.tournamRepository.create({
        ...tournamDto, tournamId: short(),
      });
      return await this.tournamRepository.save(newTournam);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`El Torneo: ${tournamDto.name} ¡ya existe!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllTournam(): Promise<Tournam[]> {
    const tournaments = await this.tournamRepository.find();
    if (!tournaments || tournaments.length == 0) {
      throw new NotFoundException('¡No se han encontrado datos de torneos!');
    }
    return tournaments;
  }

  async findTournamById(id: string): Promise<Tournam> {
    const existingTournam = await this.tournamRepository.findOne({
      where: { tournamId: id.toString() },
      relations: ['teams', 'matchs'],
    });
    if (!existingTournam) {
      throw new NotFoundException(`El Torneo: ${id} no encontrado.`);
    }
    return existingTournam;
  }

  async updateTournam(id: string, tournamData: Partial<Tournam>): Promise<Tournam | undefined> {
    const existingTournam = await this.tournamRepository.findOne({ where: { tournamId: id.toString() } });
    if (!existingTournam) {
      throw new NotFoundException(`El Torneo: ${id} no encontrado.`);
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
      throw new NotFoundException(`El Torneo: ${id} no encontrado.`);
    }
    await this.tournamRepository.softRemove(tournam); // Realiza la eliminación lógica
    return { message: `El Torneo: ${tournam.name} deshabilitado.` };
  }

  async restoreTournament(id: string): Promise<Tournam | undefined> {
    // Busca el torneo eliminado lógicamente por su ID
    const tournament = await this.tournamRepository.findOne({
      where: { tournamId: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!tournament) {
      throw new NotFoundException(`El Torneo: ${id} no encontrado.`);
    }
    if (tournament.deleteAt == null) {
      throw new NotFoundException(`El Torneo con ID: ${id} ya está restaurado.`);
    }
    // Restaura el torneo estableciendo deleteAt a null
    tournament.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.tournamRepository.save(tournament);
  }

}
