import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiCommonResponse = (obj: any) => {
  return applyDecorators(ApiExtraModels(obj), ApiOkResponse({ schema: { $ref: getSchemaPath(obj) } }));
};

export const ApiSuccessResponse = () => {
  return applyDecorators(ApiOkResponse({ schema: { properties: { is_suceess: { type: "boolean" } } } }));
};
