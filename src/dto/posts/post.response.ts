import { PickType } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { Posts } from "src/entities/posts";
import { Users } from "src/entities/users";

export class PostResponse extends PickType(Posts, ["board_id", "user_id", "title", "content", "writer"]) {
  @Exclude()
  user: Users;

  static toDto(entity: Partial<Posts>) {
    return plainToClass(PostResponse, entity);
  }
}
