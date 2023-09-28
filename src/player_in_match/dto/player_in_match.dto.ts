import { IsNumber, IsString } from 'class-validator';
import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';

export class PlayerInMatchDto {

    @IsString()
    matchEvent: string;

    @IsString()
    dateTime: Date;

    @IsNumber()
    punto: number;

    @IsString()
    player: Player;

    @IsString()
    match: Match;

} 