import { Player } from 'src/players/entities/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity('player_in_match')
export class PlayerInMatch {

  @PrimaryGeneratedColumn('uuid')
  playerInMatchId: number;

  @Column()
  minutesPlayed: number;

  @Column()
  goalsMarked: number;

  @Column()
  yellowCards: number;

  @Column()
  redCards: number;

  @ManyToOne(() => Player, (player) => player.participationsInMatches)
  player: Player;

  @ManyToOne(() => Match, (match) => match.playerInMatch)
  match: Match;
  
}
