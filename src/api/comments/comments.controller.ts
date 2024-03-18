import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Transactional } from "typeorm-transactional";
import { CreateCommentDto } from "src/dto/comments/create-comment.dto";
import { CommentResponse } from "src/dto/comments/comment.response";
import { UpdateCommentDto } from "src/dto/comments/update-comment.dto";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
} from "src/common/decorators/swagger/app/comment.decorator";

@Controller("api/posts/:postId/comments")
@ApiBearerAuth()
@ApiTags("Comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @Transactional()
  @createCommentSchema()
  async createComment(@Body() comment: CreateCommentDto) {
    const newComment = await this.commentsService.createComment(comment);
    return CommentResponse.toDto(newComment);
  }

  @Get()
  @getCommentsSchema()
  async getComments(@Param("postId") postId: number) {
    const comments = CommentResponse.toDto(await this.commentsService.getComments(postId));
    // const commentDtos = comments.map((comment) => CommentResponse.toDto(comment));
    return comments;
  }

  @Put("/:id")
  @Transactional()
  @updateCommentSchema()
  async modifyComment(@Param("id") id: number, @Body() comment: UpdateCommentDto) {
    return await this.commentsService.modifyComment(id, comment);
  }

  @Delete("/:id")
  @Transactional()
  @deleteCommentSchema()
  async deleteComment(@Param("id") id: number) {
    return await this.commentsService.deleteComment(id);
  }
}
