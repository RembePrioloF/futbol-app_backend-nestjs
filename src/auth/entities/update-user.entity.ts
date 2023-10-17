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

    @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
    role: UserRole; 

    @UpdateDateColumn({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;

}
