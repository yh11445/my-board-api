import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { ClassConstructor, plainToClass } from "class-transformer";
import { checkValidation } from "src/common/exceptions";

export const ApiCommonResponse = (obj: any) => {
  return applyDecorators(ApiExtraModels(obj), ApiOkResponse({ schema: { $ref: getSchemaPath(obj) } }));
};

export const ApiSuccessResponse = () => {
  return applyDecorators(ApiOkResponse({ schema: { properties: { is_suceess: { type: "boolean" } } } }));
};
export const entityToDto = async <T>(clazzType: ClassConstructor<T>, entity: Partial<T>) => {
  if (entity == null) return null;
  const clazz = plainToClass(clazzType, entity) as any;
  return await checkValidation(clazz);
};
