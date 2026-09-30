import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { UserDto } from './dto/user.dto.js';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body.email, body.password);
    return user;
  }

  @Get('')
  async findAllUsers(@Query('email') email: string) {
    const user = await this.usersService.findUser(email);
    console.log('USER FOUND!', user);
    return user;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findUserById(parseInt(id));
    console.log('2. HANDLER IS RUNNING _________', user);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    return user;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.removeUser(parseInt(id));
    console.log('USER DELETED!', user);
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.updateUser(parseInt(id), body);
    return user;
  }
}
