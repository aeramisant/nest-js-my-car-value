import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //see if email exists
    const users = await this.usersService.findUser(email);
    if (users.length) {
      throw new BadRequestException(
        'Email already exists, choose another email!',
      );
    }
    //hash password
    //generate a salt
    const salt = randomBytes(8).toString('hex');
    //hash salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //join hashed password and salt
    const result = salt + '_' + hash.toString('hex');
    //create a new user and save it
    const user = await this.usersService.create(email, result);
    //return new user
    console.log(
      '--------------------------------------------SIGNED UP: ',
      user,
    );
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findUser(email);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    const [salt, storedHash] = user.password.split('_');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong Password !');
    }
    console.log(
      '--------------------------------------------SIGNED IN: ',
      user,
    );
    return user;
  }
}
