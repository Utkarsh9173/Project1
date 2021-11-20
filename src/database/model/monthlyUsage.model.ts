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

@Entity('monthlyUsage')
export class MonthlyUsage {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'text', array: true, nullable: true })
  public userId: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public jan: string[];

  @Column({ type: 'text', array: true, nullable: true })
  feb: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public mar: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public apr: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public may: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public jun: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public jul: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public aug: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public sept: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public oct: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public nov: string[];

  @Column({ type: 'text', array: true, nullable: true })
  public dec: string[];

  @Column({ nullable: false })
  public year: string;

  @CreateDateColumn({
    select: false
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  public updatedAt: Date;

  @OneToOne((type) => User, (user) => user.monthlyUsage)
  user: User;
}
