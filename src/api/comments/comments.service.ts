import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDto } from "src/dto/comments/create-comment.dto";
import { UpdateCommentDto } from "src/dto/comments/update-comment.dto";
import { Comments } from "src/entities/comments";
import { Repository } from "typeorm";

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comments) private commentRepository: Repository<Comments>) {}

  createComment(comment: CreateCommentDto) {
    return this.commentRepository.save(comment);
  }

  async getComments(postId: number) {
    const comments = await this.commentRepository
      .createQueryBuilder("comments")
      .leftJoinAndSelect("comments.user", "user")
      .where("post_id = :postId", { postId })
      .orderBy("comments.created_at", "DESC")
      .getMany();
    return comments;
  }

  async getComment(id: number) {
    const comment = await this.commentRepository
      .createQueryBuilder("comments")
      .leftJoinAndSelect("comments.user", "user")
      .where("id = :id", { id })
      .getOne();
    return comment;
  }

  async modifyComment(id: number, _comment: UpdateCommentDto) {
    const updateResult = await this.commentRepository.update({ id }, _comment);

    if (updateResult !== null) {
      return true;
    } else {
      return false;
    }
  }

  async deleteComment(id: number) {
    const deleteResult = await this.commentRepository.softDelete(id);
    if (deleteResult !== null) return true;
    else return false;
  }
}
