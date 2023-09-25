import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tournam } from '../entities/tournam.entity';

@Entity('matches')
export class Match {

  @PrimaryGeneratedColumn()
  matchID: number;

  @Column({ type: 'datetime' })
  dateTime: Date;

  @Column()
  field: string;

  @ManyToOne(() => Tournam, (tournam) => tournam.matchs)
  @JoinColumn({ name: 'tournamId' })
  tournaments: Tournam;

  @ManyToOne(() => Team, (team) => team.localTeam)
  @JoinColumn({ name: 'localTeamID', referencedColumnName: 'teamId' })
  localTeam: Team;

  @ManyToOne(() => Team, (team) => team.visitingTeam)
  @JoinColumn({ name: 'visitingTeamID', referencedColumnName: 'teamId' })
  visitingTeam: Team;

  @ManyToMany(() => Player, (player) => player.matchs)
  @JoinTable()
  players: Player[];

  /* @OneToMany(() => PlayerInMatch, (playerInMatch) => playerInMatch.matchs)
  playerInMatchs: PlayerInMatch[];

  @OneToMany(() => Result, (result) => result.matchs)
  results: Result[]; */

}
