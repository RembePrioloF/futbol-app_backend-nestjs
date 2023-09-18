import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../dto/roles.enum";

@Entity('users')
export class UpdateUser {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, })
    name: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.MODERATOR })
    role: UserRole; // Utiliza el enum para el campo de rol

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

}
