import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('matches')
//@Unique(['localTeamId', 'visitingTeamId', 'dateTime']) // Añadir un índice único para evitar duplicados
export class Match {

  @PrimaryGeneratedColumn()
  id: string; // Esta será la clave primaria artificial

  /* @PrimaryColumn()
  localTeamId: string;

  @PrimaryColumn()
  visitingTeamId: string;

  @PrimaryColumn({ type: 'datetime' })
  dateTime: Date; */

  @Column()
  dateTime: Date; 

  @Column()
  field: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleteAt: Date;

  @ManyToOne(() => Tournam, (tournam) => tournam.matchs)
  @JoinColumn({ name: 'tournamId' })
  tournam: Tournam;

  @ManyToOne(() => Team, (team) => team.localTeam)
  @JoinColumn({ name: 'localTeamId', referencedColumnName: 'teamId' })
  localTeam: Team;

  @ManyToOne(() => Team, (team) => team.visitingTeam)
  @JoinColumn({ name: 'visitingTeamId', referencedColumnName: 'teamId' })
  visitingTeam: Team;

  @ManyToMany(() => Player, (player) => player.matchs)
  @JoinTable()
  players: Player[];

}
