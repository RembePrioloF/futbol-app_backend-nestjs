import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';

export class MatchDto {

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
    @IsNotEmpty()
    tournam: Tournam;

    @IsString()
    localTeam: Team;

    @IsString()
    visitingTeam: Team;

} 