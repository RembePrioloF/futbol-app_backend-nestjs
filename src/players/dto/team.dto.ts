import { IsOptional, IsString } from 'class-validator';

export class TeamDto {

    @IsString()
    teamName: string;

    @IsString()
    teamLogo: string;

    @IsString()
    @IsOptional()
    player: string[];

}