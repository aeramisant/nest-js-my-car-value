import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  password: string;

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
/*
n the upcoming lecture, we will be adding service methods to our users.services.ts file. There have been some breaking changes in the 0.3.0 TypeORM release which deprecates findBy and requires a small change to find.

Locate the findOne method and update the return to look like this:

findOne(id: number) {
  return this.repo.findOneBy({ id });
}
Locate the find method and update the return to look like this:

find(email: string) {
  return this.repo.find({ where: { email } });
}
*/
