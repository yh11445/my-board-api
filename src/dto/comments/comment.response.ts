import { PickType } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { isArray } from "class-validator";
import { Comments } from "@entities/comments";
import { Users } from "@entities/users";

export class CommentResponse extends PickType(Comments, [
  "id",
  "post_id",
  "user_id",
  "depth",
  "parent_id",
  "content",
  "writer",
  "created_at",
  "updated_at",
]) {
  @Exclude()
  user: Users;

  static toDto(entity: Partial<Comments> | Partial<Comments[]>) {
    if (isArray(entity)) {
      return entity.map((comment) => plainToClass(CommentResponse, comment));
    } else {
      return plainToClass(CommentResponse, entity);
    }
  }
}
