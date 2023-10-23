import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { League } from './league.enum';

export class TournamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsEnum(League)
    @IsNotEmpty()
    league: League;

    @IsString()
    @IsNotEmpty()
    startDate: Date;

    @IsString()
    @IsOptional()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    user: User;

}