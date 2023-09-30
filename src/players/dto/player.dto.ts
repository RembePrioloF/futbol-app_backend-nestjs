import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class PlayerDto {

    @IsString()
    name: string;

    @IsString()
    birthDate: Date;

    @IsNumber()
    playerNumber: number;

    @IsString()
    @IsOptional()
    position: string;

    @IsString()
    team: Team;

}
