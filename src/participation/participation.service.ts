import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipationDto } from './dto';
import { Participation } from './entities/participation.entity';

@Injectable()
export class ParticipationService {

  constructor(
    @InjectRepository(Participation)
    private readonly participationRepository: Repository<Participation>,
  ) { }

  async createParticipation(participations: Partial<Participation>): Promise<Participation> {
    try {
      // Crea un nuevo Participation
      const newParticipation = this.participationRepository.create(participations);
      return await this.participationRepository.save(newParticipation);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Participation already exists!`)
      }
      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        throw new BadRequestException(`The Participations1: not exists!`)
      }
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(`The Participations2: not exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async findAllParticipation(): Promise<Participation[]> {
    const participationData = await this.participationRepository.find();
    if (!participationData || participationData.length == 0) {
      throw new NotFoundException('Participationents data not found!');
    }
    return participationData;
  }

  async findParticipationById(id: string): Promise<Participation> {
    const existingParticipation = await this.participationRepository.findOne({
      where: { id: id.toString() },
      relations: ['team', 'tournam'],
    });
    if (!existingParticipation) {
      throw new NotFoundException(`The Participation:${id} not found`);
    }
    return existingParticipation;
  }

  async updateParticipation(id: string, participationData: Partial<ParticipationDto>): Promise<Participation> {
    const existingParticipation = await this.participationRepository.findOne({ where: { id: id.toString() } });
    if (!existingParticipation) {
      throw new NotFoundException(`Participation with ID ${id} not found`);
    }
    try {
      // Actualiza las propiedades con los datos proporcionados
      this.participationRepository.merge(existingParticipation, participationData);
      // Guarda los cambios en la base de datos
      const updatedParticipation = await this.participationRepository.save(existingParticipation);
      return updatedParticipation;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(`The Participation already exists!`)
      }
      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        throw new BadRequestException(`The Participations1: not exists!`)
      }
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(`The Participations2: not exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  async deleteParticipation(id: string) {
    const participation = await this.participationRepository.findOne({ where: { id: id.toString() } });
    if (!participation) {
      throw new NotFoundException(`The Participation:${id} not found`);
    }
    await this.participationRepository.softRemove(participation); // Realiza la eliminación lógica
    return { message: `The Participation:${participation} disabled` };
  }

  async restoreParticipationent(id: string): Promise<Participation | undefined> {
    // Busca el torneo eliminado lógicamente por su ID
    const participationent = await this.participationRepository.findOne({
      where: { id: id.toString() },
      withDeleted: true, // Esto te permitirá acceder a los registros eliminados lógicamente
    });
    if (!participationent) {
      throw new NotFoundException(`Participationent with ID ${id} not found.`);
    }
    if (participationent.deleteAt == null) {
      throw new NotFoundException(`Participationent with ID ${id} already restored.`);
    }
    // Restaura el torneo estableciendo deleteAt a null
    participationent.deleteAt = null;
    // Guarda los cambios en la base de datos
    return this.participationRepository.save(participationent);
  }

}
