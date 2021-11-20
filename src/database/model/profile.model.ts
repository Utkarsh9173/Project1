import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.model';

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public dob: Date;

    @Column()
    public phoneNumber: string;

    @Column()
    public addressLineOne: string;

    @Column({ nullable: true })
    public addressLineTwo: string;

    @Column()
    public city: string;

    @Column()
    public postcode: string;

    @UpdateDateColumn({
        select: false
    })
    public createdAt: Date;

    @UpdateDateColumn({
        select: false
    })
    public updatedAt: Date;

    @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
    user: User;
}
