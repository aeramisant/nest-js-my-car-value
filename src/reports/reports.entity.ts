import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  type Relation,
} from 'typeorm';
import { User } from '../users/user.entity.js';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column()
  milage: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: Relation<User>;
}
