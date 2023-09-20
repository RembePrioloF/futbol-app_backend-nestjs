import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tournam } from '../entities/tournam.entity';

@Entity('participations')
export class Participation {

  @PrimaryGeneratedColumn('uuid')
  participationID: number;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column()
  otherAttributes: string;

  @ManyToOne(() => Team, (team) => team.participations)
  team: Team;

  @ManyToOne(() => Tournam, (tournam) => tournam.participations)
  tournam: Tournam;

}
