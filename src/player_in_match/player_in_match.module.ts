
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Match } from 'src/matches/entities/match.entity';
import { MatchService } from 'src/matches/match.service';
import { Player } from 'src/players/entities/player.entity';
import { PlayerService } from 'src/players/player.service';
import { Team } from 'src/teams/entities/team.entity';
import { TeamService } from 'src/teams/team.service';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { TournamService } from 'src/tournaments/tournam.service';
import { PlayerInMatch } from './entities/player_in_match.entity';
import { PlayerInMatchController } from './player_in_match.controller';
import { PlayerInMatchService } from './player_in_match.service';

@Module({
  controllers: [PlayerInMatchController],
  providers: [
    PlayerInMatchService,
    MatchService,
    TournamService,
    TeamService,
    PlayerService,
    AuthService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PlayerInMatch,
      Match,
      Tournam,
      Team,
      Player,
      User,
    ]),
  ]
})
export class PlayerInMatchModule { }
