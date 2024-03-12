import { HttpException } from "@nestjs/common";
import { ValidationError, validate } from "class-validator";

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    const errorObj = errors.reduce(
      (prev, { property, constraints }: any) => ((prev[property] = [Object.values(constraints || {}).join(",")]), prev),
      {}
    );
    super(errorObj, 400);
  }
}
export const checkValidation = async <T extends object>(entity: T) => {
  const validationErrors = await validate(entity, { whitelist: true });
  if (validationErrors?.length > 0) throw new ValidationException(validationErrors);
  return entity;
};
