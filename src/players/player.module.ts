
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { TeamModule } from 'src/teams/team.module';
import { TeamService } from 'src/teams/team.service';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, TeamService],
  imports: [
    TypeOrmModule.forFeature([Player, Team]),
    TeamModule,
  ]
})
export class PlayerModule { }
