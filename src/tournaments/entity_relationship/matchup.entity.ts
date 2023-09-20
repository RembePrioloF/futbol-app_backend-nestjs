import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { Team } from 'src/teams/entities/team.entity';

@Entity('matchup')
export class Matchup {

  @PrimaryGeneratedColumn('uuid')
  matchupId: number;

  @ManyToOne(() => Match, (match) => match.matchups)
  match: Match;

  @ManyToOne(() => Team, (team) => team.confrontationsLocal)
  equipoLocal: Team;

   @ManyToOne(() => Team, (team) => team.confrontationsVisitor)
   equipoVisitante: Team;
}
