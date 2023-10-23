
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Tournam } from './entities/tournam.entity';
import { TournamController } from './tournam.controller';
import { TournamService } from './tournam.service';

@Module({
  controllers: [TournamController],
  providers: [TournamService, AuthService],
  imports: [
    TypeOrmModule.forFeature([Tournam, User]),
  ]
})
export class TournamModule { }
