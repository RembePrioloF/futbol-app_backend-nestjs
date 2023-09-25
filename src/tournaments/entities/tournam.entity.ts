import { Participation } from "src/participation/entities/participation.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Match } from "../entity_relationship/match.entity";

@Entity('tournaments')
export class Tournam {

    @PrimaryGeneratedColumn('uuid')
    tournamId: string;

    @Column({ unique: true })
    name: string;

    @Column()
    location: string;

    @Column()
    league: string;

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleteAt: Date;

    @OneToMany(() => Match, (match) => match.tournaments)
    matchs: Match[];

    @OneToMany(() => Participation, (participation) => participation.tournam)
    participations: Participation[];

}
