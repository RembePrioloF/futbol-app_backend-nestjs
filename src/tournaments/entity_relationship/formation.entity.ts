import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('formation')
export class Formation {

  @PrimaryGeneratedColumn('uuid')
  formationId: number;

  @Column()
  teamPosition: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @ManyToOne(() => Team, (team) => team.formations)
  team: Team;

  @ManyToOne(() => Player, (player) => player.formation)
  player: Player;
}
