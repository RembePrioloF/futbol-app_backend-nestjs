import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { TournamService } from 'src/tournaments/tournam.service';
import { Team } from './entities/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [
    TeamService,
    TournamService,
    AuthService,
  ],
  exports: [TeamService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Team, Tournam, User]),
  ]
})
export class TeamModule { }
