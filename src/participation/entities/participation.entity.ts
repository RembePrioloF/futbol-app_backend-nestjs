import { Team } from 'src/teams/entities/team.entity';
import { Tournam } from 'src/tournaments/entities/tournam.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('participations')
@Unique(['team', 'tournam'])
export class Participation {

  @PrimaryGeneratedColumn('uuid')
  id: string; // Esta será la clave primaria artificial

  @PrimaryColumn()
  teamId: string;

  @PrimaryColumn()
  tournamId: string;

  @Column({ type: 'date' })
  registrationDate: Date;

  @Column()
  referee: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleteAt: Date;

  @ManyToOne(() => Team, (team) => team.participations)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @ManyToOne(() => Tournam, (tournament) => tournament.participations)
  @JoinColumn({ name: 'tournamId' })
  tournam: Tournam;

} 
