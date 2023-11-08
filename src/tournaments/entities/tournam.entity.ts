import { User } from "src/auth/entities/user.entity";
import { Match } from "src/matches/entities/match.entity";
import { Player } from "src/players/entities/player.entity";
import { Team } from "src/teams/entities/team.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Leagues } from "../dto/leagues.enum";
import { Locations } from "../dto/locations.enum";

@Entity('tournaments')
@Unique('unique_tournam_name_in_user', ['name', 'user'])
export class Tournam {

    @PrimaryGeneratedColumn('uuid')
    tournamId: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Locations })
    location: Locations;

    @Column({ type: 'enum', enum: Leagues })
    league: Leagues;

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

    @OneToMany(() => Match, (match) => match.tournam)
    matchs: Match[];

    @OneToMany(() => Team, (team) => team.tournam)
    teams: Team[];

    @ManyToMany(() => Player, (player) => player.matchs)
    players: Player[];

    @ManyToOne(() => User, (user) => user.tournaments)
    user: User;
}
