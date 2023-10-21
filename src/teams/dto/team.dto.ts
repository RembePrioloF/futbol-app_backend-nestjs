import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

    @IsString()
    @IsNotEmpty()
    tournam: Tournam;

}