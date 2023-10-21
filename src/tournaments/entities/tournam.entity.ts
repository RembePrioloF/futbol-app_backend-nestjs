import { Match } from "src/matches/entities/match.entity";
import { Participation } from "src/participation/entities/participation.entity";
import { Player } from "src/players/entities/player.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { League } from "../dto/league.enum";
import { User } from "src/auth/entities/user.entity";
import { Team } from "src/teams/entities/team.entity";

@Entity('tournaments')
export class Tournam {

    @PrimaryGeneratedColumn('uuid')
    tournamId: string;

    @Column({ unique: true })
    name: string;

    @Column()
    location: string;

    @Column({ type: 'enum', enum: League })
    league: League;

    @Column('date')
    startDate: Date;

    @Column('date', { nullable: true })
    endDate: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleteAt: Date;

    @OneToMany(() => Team, (team) => team.tournam)
    teams: Team[];
  
    @OneToMany(() => Match, (match) => match.tournam)
    matchs: Match[];

    @OneToMany(() => Participation, (participation) => participation.tournam)
    participations: Participation[];

    @ManyToMany(() => Player, (player) => player.matchs)
    players: Player[];

    @ManyToOne(() => User, (user) => user.tournaments)
    user: User;
}
