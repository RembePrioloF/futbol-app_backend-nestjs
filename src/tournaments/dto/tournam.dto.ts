import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { League } from './league.enum';

export class TournamDto {

    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsEnum(League)
    @IsNotEmpty()
    league: League;

    @IsString()
    startDate: Date;

    @IsString()
    endDate: Date;

}