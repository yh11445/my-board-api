import { FastifyRequest } from "fastify";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { FastifyFile } from "../types";

export const UploadedFile = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: FastifyRequest = ctx.switchToHttp().getRequest();
  const result: any = req.body;
  const target: FastifyFile[] = result[data];
  if (target) return target;
  else return undefined;
});
