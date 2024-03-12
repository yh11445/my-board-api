import { FastifyRequest } from "fastify";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { FastifyFile } from "../types";

export const GFXUploadedFiles = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: FastifyRequest = ctx.switchToHttp().getRequest();
  const result: any = req.body;
  const target: FastifyFile[] = result[data];
  if (target && target.length > 1) {
    return target;
  }
  return undefined;
});
export const GFXUploadedFile = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: FastifyRequest = ctx.switchToHttp().getRequest();
  const result: any = req.body;
  const target: FastifyFile[] = result[data];
  if (target && target.length == 1) {
    return target[0];
  }
  return undefined;
});
