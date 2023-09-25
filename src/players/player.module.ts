
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from 'src/teams/team.module';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [
    TypeOrmModule.forFeature([Player]),
    TeamModule,
  ]
})
export class PlayerModule { }
