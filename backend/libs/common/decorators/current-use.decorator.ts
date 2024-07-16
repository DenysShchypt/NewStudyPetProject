import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from '../../../src/interfaces/auth';

export const CurrentUser = createParamDecorator(
  (key: keyof ICurrentUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);
