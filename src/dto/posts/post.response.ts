import { PickType } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { isArray } from "class-validator";
import { Posts } from "src/entities/posts";
import { Users } from "src/entities/users";

export class PostResponse extends PickType(Posts, ["id", "board_id", "user_id", "title", "content", "writer", "created_at", "updated_at"]) {
  @Exclude()
  user: Users;

  static toDto(entity: Partial<Posts> | Partial<Posts[]>) {
    if (isArray(entity)) {
      return entity.map((post) => plainToClass(PostResponse, post));
    } else {
      return plainToClass(PostResponse, entity);
    }
  }
}
