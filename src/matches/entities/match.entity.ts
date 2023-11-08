import { PlayerInMatch } from 'src/player_in_match/entities/player_in_match.entity';
import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('matches')
@Unique(['localTeam', 'dateMatch']) // Añadir un índice único para evitar duplicados
@Unique(['visitingTeam', 'dateMatch']) // Añadir un índice único para evitar duplicados
export class Match {

  @PrimaryGeneratedColumn('uuid')
  id: string; // Esta será la clave primaria artificial

  @Column()
  index: number;

  @Column({ type: 'timestamp' })
  dateMatch: Date;

  @Column({ nullable: true })
  field: string;

  @Column({ nullable: true })
  referee: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleteAt: Date;

  @ManyToOne(() => Tournam, (tournam) => tournam.matchs)
  tournam: Tournam;

  @ManyToOne(() => Team, (team) => team.localTeam)
  @JoinColumn({ name: 'localTeamId', referencedColumnName: 'teamId' })
  localTeam: Team;

  @ManyToOne(() => Team, (team) => team.visitingTeam)
  @JoinColumn({ name: 'visitingTeamId', referencedColumnName: 'teamId' })
  visitingTeam: Team;

  @ManyToMany(() => Player, (player) => player.matchs)
  players: Player[];

  @OneToMany(() => PlayerInMatch, (playerInMatch) => playerInMatch.player)
  playerInMatches: PlayerInMatch[];

}
