import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('teams')
export class Team {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    teamName: string;

    @Column({ nullable: true })
    teamLogo: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

}
