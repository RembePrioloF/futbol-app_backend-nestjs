
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournam } from './entities/tournam.entity';
import { TournamController } from './tournam.controller';
import { TournamService } from './tournam.service';

@Module({
  controllers: [TournamController],
  providers: [TournamService],
  imports: [
    TypeOrmModule.forFeature([Tournam]),
  ]
})
export class TournamModule { }
