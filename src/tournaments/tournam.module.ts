import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournam, TournamSchema } from './entities/tournam.entity';
import { TournamController } from './tournam.controller';
import { TournamService } from './tournam.service';

@Module({
  controllers: [TournamController],
  providers: [TournamService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Tournam.name,
        schema: TournamSchema
      }
    ]),/* 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '2h' },
    }), */
  ]
})
export class TournamModule { }
