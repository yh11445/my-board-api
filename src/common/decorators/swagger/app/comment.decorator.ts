import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiCommonResponse } from "../common";
import { CreateCommentDto } from "src/dto/comments/create-comment.dto";
import { CommentResponse } from "src/dto/comments/comment.response";
import { UpdateCommentDto } from "src/dto/comments/update-comment.dto";

const tags = "Comments";
export const createCommentSchema = () => {
  return applyDecorators(
    ApiOperation({ summary: "댓글 추가" }),
    ApiTags(tags),
    ApiBody({ type: CreateCommentDto }),
    ApiCommonResponse(CommentResponse)
  );
};
export const getCommentsSchema = () => {
  return applyDecorators(ApiOperation({ summary: "댓글 조회" }), ApiTags(tags), ApiCommonResponse(CommentResponse));
};
export const updateCommentSchema = () => {
  return applyDecorators(
    ApiOperation({ summary: "댓글 수정" }),
    ApiTags(tags),
    ApiBody({ type: UpdateCommentDto }),
    ApiCommonResponse(CommentResponse)
  );
};
export const deleteCommentSchema = () => {
  return applyDecorators(ApiOperation({ summary: "댓글 삭제" }), ApiTags(tags));
};
