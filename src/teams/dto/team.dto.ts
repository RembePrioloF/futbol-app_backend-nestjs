import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TeamDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    logo: string;

    @IsString()
    @IsNotEmpty()
    coach: string;

}