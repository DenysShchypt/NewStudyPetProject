import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data && data in request.cookies
      ? request.cookies[data]
      : data
        ? null
        : request.cookies;
  },
);
