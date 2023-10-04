
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { TeamService } from 'src/teams/team.service';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { TournamService } from 'src/tournaments/tournam.service';
import { Participation } from './entities/participation.entity';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';

@Module({
  controllers: [ParticipationController],
  providers: [ParticipationService, TournamService, TeamService],
  imports: [
    TypeOrmModule.forFeature([Participation, Tournam, Team]),
  ]
})
export class ParticipationModule { }
