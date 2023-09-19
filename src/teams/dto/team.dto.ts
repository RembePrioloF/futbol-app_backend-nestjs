import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TeamDto {

    @IsString()
    teamName: string;

    @IsString()
    teamLogo: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

}