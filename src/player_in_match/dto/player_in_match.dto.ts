import { IsNumber, IsString } from 'class-validator';
import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';

export class PlayerInMatchDto {

    @IsString()
    dateTime: Date;

    @IsString()
    matchEvent: string;

    @IsNumber()
    punto: number;

    @IsString()
    player: Player;

    @IsString()
    match: Match;

} 