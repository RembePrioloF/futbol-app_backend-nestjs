
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamService } from 'src/teams/team.service';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { TournamService } from 'src/tournaments/tournam.service';
import { Match } from './entities/match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  controllers: [MatchController],
  providers: [
    MatchService,
    TournamService,
    TeamService,
    AuthService
  ],
  imports: [
    TypeOrmModule.forFeature([Match, Tournam, Team, User]),
  ]
})
export class MatchModule { }
