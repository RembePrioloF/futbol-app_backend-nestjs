import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './players/player.module';
import { TeamModule } from './teams/team.module';
import { TournamModule } from './tournaments/tournam.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME }),
    AuthModule,
    TournamModule,
    TeamModule,
    PlayerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
