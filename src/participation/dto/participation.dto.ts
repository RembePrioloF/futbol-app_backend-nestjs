import { IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class ParticipationDto {

    @IsString()
    registrationDate: Date;

    @IsString()
    referee: string;

    @IsString()
    team: Team;

    @IsString()
    tournam: Team;

}