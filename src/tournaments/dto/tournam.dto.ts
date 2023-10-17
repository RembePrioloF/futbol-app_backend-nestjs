import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

}