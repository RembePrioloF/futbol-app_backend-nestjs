import { IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class ParticipationDto {

    @IsString()
    referee: string;

    @IsString()
    team: Team;

    @IsString()
    tournam: Team;

}