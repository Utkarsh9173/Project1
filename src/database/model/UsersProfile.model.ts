import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

@Entity('UsersProfile')
export class UsersProfile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public empId: string;

  @Column({ nullable: false })
  public department: string;

  @Column({ nullable: false })
  public location: string;

  @Column({ nullable: true })
  public designation: boolean;

  @Column({ nullable: true })
  public joiningDate: string;

  @Column({ nullable: true })
  public displayPicture: string;

  @Column({ nullable: true })
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
