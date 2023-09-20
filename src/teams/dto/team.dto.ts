import { IsBoolean, IsOptional, IsString } from 'class-validator';

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