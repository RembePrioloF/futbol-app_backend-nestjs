import { Team } from "src/teams/entities/team.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Positions } from "../dto";
import { Match } from "src/matches/entities/match.entity";

@Entity('players')
export class Player {

    @PrimaryGeneratedColumn('uuid')
    playerId: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @Column({ unique: true })
    playerNumber: number;

    @Column({ type: 'enum', enum: Positions })
    position: Positions;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleteAt: Date;

    @ManyToOne(() => Team, (team) => team.players)
    @JoinColumn({ name: 'teamId' })
    team: Team;

    @ManyToMany(() => Match, (match) => match.players)
    @JoinTable()
    matchs: Match[];

}
