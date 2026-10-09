import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  type Relation,
} from 'typeorm';
import { Report } from '../reports/reports.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Relation<Report[]>;

  @AfterInsert()
  logInsert() {
    console.log(`Insert User with id: ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id: ${this.id}`);
  }
}
