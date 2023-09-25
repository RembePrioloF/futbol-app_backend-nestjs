/* import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tournam } from '../entities/tournam.entity';

@Entity('participations')
export class Participation {

  @PrimaryGeneratedColumn('uuid')
  participationId: string;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column()
  otherAttributes: string;

  @ManyToOne(() => Team, (team) => team.participations)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @ManyToOne(() => Tournam, (tournament) => tournament.participations)
  @JoinColumn({ name: 'tournamId' })
  tournament: Tournam;

} 
 */