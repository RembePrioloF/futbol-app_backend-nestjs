import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
/* 
import { PlayerModule } from './players/player.module';
import { TeamModule } from './teams/team.module';
import { TournamModule } from './tournaments/tournam.module';
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //synchronize: true,
        //logging: false
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    /* 
   TournamModule,
    TeamModule,
    PlayerModule */
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
