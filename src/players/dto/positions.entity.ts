/* // positions.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('positions')
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;
}
 */