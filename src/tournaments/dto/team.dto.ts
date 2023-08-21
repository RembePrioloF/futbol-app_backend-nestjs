import { IsNumber, IsString } from 'class-validator';

export class TeamDto {

    @IsString()
    playerName: string;

    @IsString()
    teamLogo: string;

    @IsString()
    playerNumber: string;

    @IsString()
    playerPosition: string;

}