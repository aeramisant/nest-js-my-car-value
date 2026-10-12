import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      console.log(
        'LOGGED IN USER IS NOT AN ADMIN!!!!!!!!!!!!!!!!!!!!!',
        request.currentUser,
      );
      return false;
    }
    console.log('ADMIN IS LOGGED IN !!!!!!!!!!!', request.currentUser);
    return request.currentUser.admin ?? false;
  }
}
