import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDto } from "src/dto/comments/create-comment.dto";
import { Comments } from "src/entities/comments";
import { Repository } from "typeorm";

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comments) private commentRepository: Repository<Comments>) {}

  createComment(comment: CreateCommentDto) {
    return this.commentRepository.save(comment);
  }
}
