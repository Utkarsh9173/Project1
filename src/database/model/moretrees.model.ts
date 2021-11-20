import { double } from 'aws-sdk/clients/lightsail';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { User } from './user.model';

@Entity('moretrees')
export class MoreTrees {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public userId: string;

    @Column()
    public noOfTrees: number;

    @Column({ nullable: true })
    public certificateId: string;

    @Column({ nullable: true })
    public certificateUrl: string;

    @Column({ nullable: true })
    public totalCarbonOffset: double;

    @CreateDateColumn({
        select: false
    })
    public createdAt: Date;

    @UpdateDateColumn({
        select: false
    })
    public updatedAt: Date;

    @OneToOne(() => User, (user) => user.moreTrees) // specify inverse side as a second parameter
    user: User;
}
