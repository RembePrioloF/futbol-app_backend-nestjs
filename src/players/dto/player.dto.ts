import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Team } from 'src/teams/entities/team.entity';

export class PlayerDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    birthDate: Date;

    @IsNumber()
    @IsNotEmpty()
    playerNumber: number;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsBoolean()
    @IsOptional()
    isCaptain: boolean;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    team: Team;

}
