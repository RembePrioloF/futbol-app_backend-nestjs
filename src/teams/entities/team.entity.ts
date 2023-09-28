import { Match } from "src/matches/entities/match.entity";
import { Participation } from "src/participation/entities/participation.entity";
import { Player } from "src/players/entities/player.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('teams')
export class Team {

  @PrimaryGeneratedColumn('uuid')
  teamId: string;

  @Column({ unique: true, nullable: true })
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  coach: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deleteAt: Date;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @OneToMany(() => Match, (match) => match.localTeam)
  localMatches: Match[];

  @OneToMany(() => Match, (match) => match.visitingTeam)
  visitingMatches: Match[];

  @OneToMany(() => Participation, (participation) => participation.team)
  participations: Participation[];

}
