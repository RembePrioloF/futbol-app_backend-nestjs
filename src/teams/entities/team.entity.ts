import { Player } from "src/players/entities/player.entity";
import { Formation } from "src/tournaments/entity_relationship/formation.entity";
import { Matchup } from "src/tournaments/entity_relationship/matchup.entity";
import { Participation } from "src/tournaments/entity_relationship/participation.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;

  @ManyToMany(() => Player, (player) => player.team)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Participation, (participacion) => participacion.team)
  participations: Participation[];

  @OneToMany(() => Formation, (formation) => formation.team)
  formations: Formation[];

  @OneToMany(() => Matchup, (match) => match.equipoLocal)
  confrontationsLocal: Matchup[];

  @OneToMany(() => Matchup, (match) => match.equipoVisitante)
  confrontationsVisitor: Matchup[];
}
