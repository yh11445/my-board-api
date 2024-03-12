import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
const tags = "WEB";
export const getHelloSchema = () => {
  return applyDecorators(ApiOperation({ summary: "hello World!" }), ApiTags(tags), applyDecorators(ApiOkResponse({ schema: { type: "string" } })));
};
