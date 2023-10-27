import { Match } from "src/matches/entities/match.entity";
import { PlayerInMatch } from "src/player_in_match/entities/player_in_match.entity";
import { Team } from "src/teams/entities/team.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Positions } from "../dto";

@Entity('players')
@Unique('unique_player_playerNumber_in_team', ['playerNumber', 'team'])
export class Player {

    @PrimaryGeneratedColumn('uuid')
    playerId: string;

    @Column()
    name: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @Column()
    playerNumber: number;

    @Column({ type: 'enum', enum: Positions })
    position: string;

    @Column({ default: false })
    isCaptain: boolean;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleteAt: Date;

    @ManyToOne(() => Team, (team) => team.players)
    team: Team;

    @ManyToMany(() => Match, (match) => match.players)
    matchs: Match[];

    @OneToMany(() => PlayerInMatch, (playerInMatch) => playerInMatch.player)
    playerInMatches: PlayerInMatch[];

}
