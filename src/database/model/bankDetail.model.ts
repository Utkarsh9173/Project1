import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.model';

@Entity('bank_detail')
export class BankDetail {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: true })
    public paymentPlan: number;

    @Column({ nullable: true })
    public accountHolderName: string;

    @Column({ nullable: true })
    public accountNumber: string;

    @Column({ nullable: true })
    public accountSortCode: string;

    @Column({ nullable: true })
    public cardHolderName: string;

    @Column({ nullable: true })
    public cardSortCode: string;

    @Column({ nullable: true })
    public cardNumber: string;

    @Column({ nullable: true })
    public cardExpiryDate: Date;

    @UpdateDateColumn({
        select: false
    })
    public createdAt: Date;

    @UpdateDateColumn({
        select: false
    })
    public updatedAt: Date;

    @OneToOne(() => User, (user) => user.bankDetail) // specify inverse side as a second parameter
    user: User;
}
