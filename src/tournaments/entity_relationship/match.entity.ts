import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Matchup } from './matchup.entity';
import { PlayerInMatch } from './player_in_match.entity';
import { Tournam } from '../entities/tournam.entity';

@Entity('matches')
export class Match {

  @PrimaryGeneratedColumn('uuid')
  matchID: number;

  @Column({ type: 'datetime' })
  dateTime: Date;

  @Column()
  location: string;

  @Column()
  result: string;

  @Column()
  tournamentPhase: string;

  @ManyToOne(() => Tournam, (tournam) => tournam.participations)
  tournam: Tournam;

  @OneToMany(() => PlayerInMatch, (playerInMatch) => playerInMatch.match)
  playerInMatch: PlayerInMatch[];

  @OneToMany(() => Matchup, (matchup) => matchup.match)
  matchups: Matchup[];

}
