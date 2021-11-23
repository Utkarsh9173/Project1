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

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public email: string;

  @Column()
  public firstName: string;

  @Column({ nullable: false })
  public lastName: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: true })
  public isReferred: boolean;

  @Column({ nullable: true })
  public referralCode: string;

  @Column({ nullable: false })
  public mobile: string;

  // @Column({ nullable: false })
  // public empId: string;

  @Column({ nullable: false })
  public accountTypeId: number;

  @Column({ nullable: false })
  public accountStatus: boolean;

  @Column({ nullable: false })
  public createdBy: string;

  @Column({ nullable: true })
  public updatedBy: string;

  @CreateDateColumn({
    select: false
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  public updatedAt: Date;
}
