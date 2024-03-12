import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const SessionUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  if (data) return req.user[data];
  return req.user;
});

// export type SessionAdminUserType = Partial<Admins>;
