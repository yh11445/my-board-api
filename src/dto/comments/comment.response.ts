import { PickType } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { Comments } from "src/entities/comments";
import { Users } from "src/entities/users";

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

  static toDto(entity: Partial<Comments>) {
    return plainToClass(CommentResponse, entity);
  }
}
