import { FastifyRequest } from "fastify";
import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { validate } from "class-validator";
// Upload
export const ParamAndBody = createParamDecorator(async (args: { data?: any; options?: { whitelist: boolean } }, ctx: ExecutionContext) => {
  const data = args?.data;
  const options = args?.options;
  const req: FastifyRequest = ctx.switchToHttp().getRequest();
  const body: any = req.body;
  const params: any = req.params;

  const result: any = { ...body, ...params };
  if (data) {
    if (result[data] == null) throw new BadRequestException(`${Object.keys(result)}에서 ${data}를 찾을 수 없음`);
    return result[data];
  }
  await validate(result, options);
  return result;
});
