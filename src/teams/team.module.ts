
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Team]),
  ]
})
export class TeamModule { }
