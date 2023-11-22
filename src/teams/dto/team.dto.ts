import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Tournam } from 'src/tournaments/entities/tournam.entity';

export class TeamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    logo: string;

    @IsString()
    @IsOptional()
    coach: string;

    @IsBoolean()
    @IsOptional()
    winner: boolean;

    @IsString()
    @IsNotEmpty()
    tournam: Tournam;

}