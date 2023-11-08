import { Match } from "src/matches/entities/match.entity";
import { Player } from "src/players/entities/player.entity";
import { Tournam } from "src/tournaments/entities/tournam.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('teams')
@Unique('unique_team_name_in_tournament', ['name', 'tournam'])
export class Team {

  @PrimaryGeneratedColumn('uuid')
  teamId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  coach: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleteAt: Date;

  @ManyToOne(() => Tournam, (tournam) => tournam.teams)
  tournam: Tournam;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToMany(() => Match, (match) => match.localTeam)
  localTeam: Match[];

  @OneToMany(() => Match, (match) => match.visitingTeam)
  visitingTeam: Match[];

}
