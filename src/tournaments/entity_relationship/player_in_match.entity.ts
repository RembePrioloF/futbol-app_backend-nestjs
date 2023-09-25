/* import { Player } from 'src/players/entities/player.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity('player_in_match')
export class PlayerInMatch {

  @PrimaryColumn()
  playerId: number;

  @PrimaryColumn()
  matchID: number;

  @Column()
  goalsMarked: number;

  @Column()
  yellowCards: number;

  @Column()
  redCards: number;

  @Column()
  blueCards: number;

  @ManyToOne(() => Player, (player) => player.playerInMatchs)
  @JoinColumn({ name: 'playerId' })
  players: Player;

  @ManyToOne(() => Match, (match) => match.playerInMatchs)
  @JoinColumn({ name: 'matchID' })
  matchs: Match;

}
 */