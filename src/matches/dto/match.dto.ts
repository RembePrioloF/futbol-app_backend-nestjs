import { IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';

export class MatchDto {

    @IsString()
    dateMatch: Date;

    @IsString()
    field: string;

    @IsString()
    tournam: Tournam;

    @IsString()
    localTeam: Team;

    @IsString()
    visitingTeam: Team; 

} 