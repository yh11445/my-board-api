import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "src/dto/create-post.dto";
import { ApiCommonResponse } from "../common";
import { GetPostDto } from "src/dto/get-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";

const tags = "Posts";
export const createPostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 추가" }), ApiTags(tags), ApiBody({ type: CreatePostDto }), ApiCommonResponse(GetPostDto));
};
export const getPostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 조회" }), ApiTags(tags), ApiCommonResponse(GetPostDto));
};
export const updatePostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 수정" }), ApiTags(tags), ApiBody({ type: UpdatePostDto }), ApiCommonResponse(GetPostDto));
};
export const deletePostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 삭제" }), ApiTags(tags));
};
