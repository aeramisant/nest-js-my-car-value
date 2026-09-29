import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    console.log('USER CREATED: ----------> ', user);
    return this.repo.save(user);
  }

  findUserById(id: number) {
    return this.repo.findOneBy({ id });
  }
  findUser(email: string) {
    return this.repo.find({ where: { email } });
  }
  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('<--- user not found --->');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async removeUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('<--- user not found --->');
    }
    return this.repo.remove(user);
  }
}
