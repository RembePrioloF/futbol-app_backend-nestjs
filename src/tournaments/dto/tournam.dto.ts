import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class TournamDto {

    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsString()
    league: string;

    @IsString()
    startDate: Date;
  
    @IsString()
    endDate: Date;

}