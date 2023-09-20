import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TournamDto {

    @IsString()
    name: string;

    @IsString()
    location: string;

    @IsString()
    league: string;

    @IsString()
    competitionDays: string;

    @IsString()
    competitionTime: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

}