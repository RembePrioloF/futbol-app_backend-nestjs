import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class MatchDto {

    @IsNumber()
    @IsNotEmpty()
    index: number;

    @IsString()
    @IsNotEmpty()
    dateMatch: Date;

    @IsString()
    @IsOptional()
    field: string;

    @IsString()
    @IsOptional()
    referee: string;

    @IsString()
    localTeam: Team;

    @IsString()
    visitingTeam: Team;

} 