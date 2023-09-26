
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [
    TypeOrmModule.forFeature([Match]),
  ]
})
export class MatchModule { }
