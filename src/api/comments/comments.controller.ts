import { Body, Controller, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Transactional } from "typeorm-transactional";
import { CreateCommentDto } from "src/dto/comments/create-comment.dto";

@Controller("api/comments")
@ApiBearerAuth()
@ApiTags("Comments")
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @Transactional()
  async createComment(@Body() comment: CreateCommentDto) {
    const newComment = await this.commentsService.createComment(comment);
    return newComment;
  }
}
