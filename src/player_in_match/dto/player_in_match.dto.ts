import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';

export class PlayerInMatchDto {

    @IsString()
    @IsNotEmpty()
    matchEvent: string;

    @IsNumber()
    @IsOptional()
    point: number;

    @IsString()
    @IsNotEmpty()
    player: Player;

    @IsString()
    @IsNotEmpty()
    match: Match;

} 