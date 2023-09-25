import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Tournam } from 'src/tournaments/entities/tournam.entity';

export class TeamDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    logo: string;

    @IsString()
    coach: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

}