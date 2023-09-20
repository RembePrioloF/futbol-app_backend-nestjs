import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Participation } from "../entity_relationship/participation.entity";

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

    @Column({ type: 'date' }) // Tipo de dato 'date' para MySQL
    competitionDays: string;

    @Column({ type: 'time' }) // Tipo de dato 'time' para MySQL
    competitionTime: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

    @OneToMany(() => Participation, (participation) => participation.tournam)
    participations: Participation[];

}
