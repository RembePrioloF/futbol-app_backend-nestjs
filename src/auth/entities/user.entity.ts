import { Tournam } from "src/tournaments/entities/tournam.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../dto/roles.enum";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ nullable: false, })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
    role: UserRole;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deleteAt: Date;

    @OneToMany(() => Tournam, (tournament) => tournament.user)
    tournaments: Tournam[];
}
