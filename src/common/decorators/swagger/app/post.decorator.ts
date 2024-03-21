import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePostDto } from "src/dto/posts/create-post.dto";
import { ApiCommonResponse } from "../common";
import { GetPostDto } from "src/dto/posts/get-post.dto";
import { UpdatePostDto } from "src/dto/posts/update-post.dto";
import { PostResponse } from "src/dto/posts/post.response";

const tags = "Posts";
export const createPostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 추가" }), ApiTags(tags), ApiBody({ type: CreatePostDto }), ApiCommonResponse(PostResponse));
};
export const getPostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 조회" }), ApiTags(tags), ApiCommonResponse(PostResponse));
};
export const updatePostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 수정" }), ApiTags(tags), ApiBody({ type: UpdatePostDto }), ApiCommonResponse(PostResponse));
};
export const deletePostSchema = () => {
  return applyDecorators(ApiOperation({ summary: "게시글 삭제" }), ApiTags(tags));
};
export const uploadFileSchema = () => {
  return applyDecorators(ApiOperation({ summary: "파일 업로드" }), ApiTags(tags));
};
