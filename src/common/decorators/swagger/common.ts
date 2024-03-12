import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiQuery, getSchemaPath } from "@nestjs/swagger";
import { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { SwaggerEnumType } from "@nestjs/swagger/dist/types/swagger-enum.type";

export const ApiCommonResponse = (obj: any) => {
  return applyDecorators(ApiExtraModels(obj), ApiOkResponse({ schema: { properties: { data: { $ref: getSchemaPath(obj) } } } }));
};
export const ApiCommonArrayResponse = (obj: any) => {
  return applyDecorators(
    ApiExtraModels(obj),
    ApiOkResponse({ schema: { properties: { data: { type: "array", items: { $ref: getSchemaPath(obj) } } } } })
  );
};
export const ApiCustomCommonResponse = (properties: any) => {
  return applyDecorators(ApiOkResponse({ schema: { properties: { data: { properties } } } }));
};
export const ApiCustomCommonArrayResponse = (properties: any) => {
  return applyDecorators(ApiOkResponse({ schema: { properties: { data: { type: "array", items: { properties } } } } }));
};
export const ApiSuccessResponse = () => {
  return applyDecorators(ApiOkResponse({ schema: { properties: { is_suceess: { type: "boolean" } } } }));
};
export const ApiPagingResponse = (obj: any, options?: { props: any }) => {
  const props = options?.props || null;
  return applyDecorators(
    ApiExtraModels(obj),
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            type: "array",
            items: { $ref: getSchemaPath(obj) },
          },
          // links: {
          //   type: "object",
          //   properties: {
          //     first: { type: "string", nullable: true },
          //     last: { type: "string", nullable: true },
          //     prev: { type: "string", nullable: true },
          //     next: { type: "string", nullable: true },
          //   },
          // },
          meta: {
            type: "object",
            properties: {
              current_page: { type: "number" },
              last_page: { type: "number" },
              per_page: { type: "number" },
              total: { type: "number" },
              from: { type: "number" },
              to: { type: "number" },
              // path: { type: "string" },
            },
          },
        },
      },
    })
  );
};

export const ApiPagingQuery = (
  columns: string[],
  properties: { name: string; description?: string; enums?: SwaggerEnumType; schema?: SchemaObject | ReferenceObject }[]
) => {
  return applyDecorators(
    ApiQuery({ name: "q", description: "Keyword for search" }),
    ApiQuery({ name: "page", description: "number of pages", schema: { default: 1 } }),
    ApiQuery({ name: "per_page", description: "take", schema: { default: 10 } }),
    ApiQuery({ name: "sort", description: "Columns to sort", enum: [...columns, ""], schema: { nullable: true } }),
    ApiQuery({ name: "order", description: "ASC | DESC" }),
    ...properties.map(({ name, description, enums, schema }) => ApiQuery({ name, description, enum: enums, schema }))
  );
};
