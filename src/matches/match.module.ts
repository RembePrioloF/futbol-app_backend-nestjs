
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { TeamService } from 'src/teams/team.service';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { TournamService } from 'src/tournaments/tournam.service';
import { Match } from './entities/match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  controllers: [MatchController],
  providers: [MatchService, TournamService, TeamService],
  imports: [
    TypeOrmModule.forFeature([Match, Tournam, Team]),
  ]
})
export class MatchModule { }
