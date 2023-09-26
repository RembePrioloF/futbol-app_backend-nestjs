import { IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';

export class MatchDto {

    @IsString()
    dateTime: Date;

    @IsString()
    field: string;

    @IsString()
    tournam: Tournam;

    @IsString()
    localTeamId: Team;

    @IsString()
    visitingTeamId: Team; 

} 