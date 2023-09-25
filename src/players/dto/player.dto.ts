import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';
import { Positions } from './positions.enum';

export class PlayerDto {

    @IsString()
    name: string;

    @IsString()
    birthDate: Date;

    @IsNumber()
    playerNumber: number;

    @IsString()
    @IsOptional()
    position: Positions;

    @IsString()
    team: Team;

}
