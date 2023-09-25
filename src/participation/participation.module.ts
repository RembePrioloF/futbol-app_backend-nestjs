
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';

@Module({
  controllers: [ParticipationController],
  providers: [ParticipationService],
  imports: [
    TypeOrmModule.forFeature([Participation]),
  ]
})
export class ParticipationModule { }
