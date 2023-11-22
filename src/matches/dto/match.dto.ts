import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';

export class MatchDto {

    @IsString()
    @IsOptional()
    dateMatch: Date;

    @IsString()
    @IsOptional()
    field: string;

    @IsString()
    @IsOptional()
    referee: string;

    @IsString()
    @IsOptional()
    typeMatch: string;

    @IsBoolean()
    @IsOptional()
    endMatch: boolean;

    @IsString()
    @IsOptional()
    tournam: Tournam;

    @IsString()
    @IsOptional()
    localTeam: Team;

    @IsString()
    @IsOptional()
    visitingTeam: Team;

} 