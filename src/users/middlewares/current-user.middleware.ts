import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service.js';
import type { Request, Response, NextFunction } from 'express';
import { User } from '../user.entity.js';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User | null;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {};
    console.log(
      '`Fetching the id of the user that is logging in',
      request.session,
    );
    if (userId) {
      const user = await this.usersService.findUserById(userId);
      console.log(
        '`Users ID was found and current user is inserted into the request payload',
        user,
      );
      request.currentUser = user;
      console.log(
        '`Users ID was found and current user is inserted into the request payload-------OPERATION IS COMPLETED:',
        request.currentUser,
      );
    }
    next();
  }
}
