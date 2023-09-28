import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

enum MatchEvent {
  GolMarcado = 'gol marcado',
  TarjetaAmarilla = 'tarjeta amarilla',
  TarjetaRoja = 'tarjeta roja',
  TarjetaAzul = 'tarjeta azul',
}

@Entity('players_in_matches')
@Unique(['player', 'dateTime']) // Añadir un índice único para evitar duplicados
export class PlayerInMatch {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MatchEvent })
  matchEvent: string;

  @Column({ type: 'datetime' })
  dateTime: Date;

  @Column()
  punto: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleteAt: Date;

  @ManyToOne(() => Player, (player) => player.playerInMatches)
  @JoinColumn({ name: 'playerId' })
  player: Player;

  @ManyToOne(() => Match, (match) => match.playerInMatches)
  @JoinColumn({ name: 'matchID' })
  match: Match;

}
