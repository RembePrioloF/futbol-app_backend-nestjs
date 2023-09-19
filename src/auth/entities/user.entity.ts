import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole; // Utiliza el enum para el campo de rol

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
