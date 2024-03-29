import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "src/dto/create-post.dto";
import { ApiCommonResponse } from "../common";
import { GetPostDto } from "src/dto/get-post.dto";

const tags = "Posts";
export const createPostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 추가" }), ApiTags(tags), ApiBody({ type: CreatePostDto }), ApiCommonResponse(GetPostDto));
};
export const getPostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 조회" }), ApiTags(tags), ApiCommonResponse(GetPostDto));
};
