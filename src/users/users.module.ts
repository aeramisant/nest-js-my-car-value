import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { AuthService } from './auth.service.js';
import { UsersService } from './users.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
