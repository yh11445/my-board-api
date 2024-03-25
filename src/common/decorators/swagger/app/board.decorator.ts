import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetPostDto } from "src/dto/posts/get-post.dto";
import { ApiCommonResponse } from "../common";

const tags = "Boards";
export const getPostListSchema = () => {
  return applyDecorators(ApiOperation({ summary: "글 목록 조회" }), ApiTags(tags));
};
