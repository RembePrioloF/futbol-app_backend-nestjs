import { Team } from "src/teams/entities/team.entity";
import { Formation } from "src/tournaments/entity_relationship/formation.entity";
import { PlayerInMatch } from "src/tournaments/entity_relationship/player_in_match.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('players')
export class Player {

    @PrimaryGeneratedColumn('uuid')
    playerId: string;

    @Column({ unique: true, nullable: true })
    name: string;

    @Column({ nullable: true })
    age: number;

    @Column({ unique: true, nullable: true })
    playerNumber: number;

    @Column({ unique: true, nullable: true })
    position: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

    @ManyToMany(() => Team, (team) => team.players)
    @JoinTable()
    team: Team[];

    @OneToMany(() => PlayerInMatch, (playerInMatch) => playerInMatch.player)
    participationsInMatches: PlayerInMatch[];

    @OneToMany(() => Formation, (formation) => formation.player)
    formation: Formation[];

}
