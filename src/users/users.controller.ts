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
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';
import { Serialize } from '../interceptors/serialize.interceptor.js';
import { UserDto } from './dto/user.dto.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './decorators/current-user.decorators.js';
import { User } from './user.entity.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private autService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: String, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   console.log(session);
  //   return session.color;
  // }
  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.usersService.findUserById(session.userId);
  //   console.log('WHO_AM_I ? ---> ', user);
  //   return user;
  // }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  async whoAmI(@CurrentUser() user: User) {
    console.log('WHO_AM_I ? ---> ', user);
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.autService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.autService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
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
