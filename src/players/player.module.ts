
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamModule } from 'src/teams/team.module';
import { TeamService } from 'src/teams/team.service';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { TournamService } from 'src/tournaments/tournam.service';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerService,
    TeamService,
    TournamService,
    AuthService,
  ],
  imports: [
    TypeOrmModule.forFeature([Player, Team, Tournam, User]),
    TeamModule,
  ]
})
export class PlayerModule { }
