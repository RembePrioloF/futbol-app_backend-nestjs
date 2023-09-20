
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Player]),
  ]
})
export class PlayerModule { }
