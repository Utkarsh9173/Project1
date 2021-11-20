import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { BankDetail } from './bankDetail.model';
import { MonthlyUsage } from './monthlyUsage.model';
import { MoreTrees } from './moretrees.model';
import { Profile } from './profile.model';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public email: string;

    @Column()
    public firstName: string;

    @Column({ nullable: true })
    public lastName: string;

    @Column({ nullable: true })
    public password: string;

    @Column({ nullable: false })
    public referralCode: string;

    @Column({ nullable: true })
    public referredBy: string;

    @Column({ nullable: true })
    public verifiedAt: string;

    @CreateDateColumn({
        select: false
    })
    public createdAt: Date;

    @UpdateDateColumn({
        select: false
    })
    public updatedAt: Date;

    @OneToOne(() => BankDetail, (bankDetail) => bankDetail.user, {
        cascade: true
    })
    @JoinColumn()
    bankDetail: BankDetail;

    @OneToOne(() => MonthlyUsage, (monthlyUsage) => monthlyUsage.user, {
        cascade: true
    })
    @JoinColumn()
    monthlyUsage: MonthlyUsage;

    @OneToOne(() => MoreTrees, (moreTrees) => moreTrees.user, {
        cascade: true
    })
    @JoinColumn()
    moreTrees: MoreTrees;

    @OneToOne(() => Profile, (profile) => profile.user, {
        cascade: true
    })
    @JoinColumn()
    profile: Profile;
}
