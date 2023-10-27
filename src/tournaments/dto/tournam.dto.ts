import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { Leagues } from './leagues.enum';
import { Locations } from './locations.enum';

export class TournamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(Locations)
    @IsNotEmpty()
    location: Locations;

    @IsEnum(Leagues)
    @IsNotEmpty()
    league: Leagues;

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