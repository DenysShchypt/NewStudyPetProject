import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data && data in request.cookie
      ? request.cookie[data]
      : data
        ? null
        : request.cookie;
  },
);
