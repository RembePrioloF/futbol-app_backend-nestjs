import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '../config/constants';
import { AuthModule } from './auth/auth.module';
import { MatchModule } from './matches/match.module';
import { PlayerInMatchModule } from './player_in_match/player_in_match.module';
import { PlayerModule } from './players/player.module';
import { TeamModule } from './teams/team.module';
import { TournamModule } from './tournaments/tournam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TeamModule,
    TournamModule,
    PlayerModule,
    MatchModule,
    PlayerInMatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
