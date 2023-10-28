import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { MatchEvent } from '../dto';

@Entity('players_in_matches')
@Unique(['player', 'createdAt']) // Añadir un índice único para evitar duplicados
export class PlayerInMatch {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MatchEvent })
  matchEvent: string;

  @Column({ default: 1 })
  point: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleteAt: Date;

  @ManyToOne(() => Player, (player) => player.playerInMatches)
  player: Player;

  @ManyToOne(() => Match, (match) => match.playerInMatches)
  match: Match;

}
