import { PickType } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { checkValidation } from "src/common/exceptions";
import { Posts } from "src/entities/posts";
import { Users } from "src/entities/users";

export class CreatePostDto extends PickType(Posts, ["board_id", "user_id", "title", "content", "writer"]) {
  public async toEntity<T>(entity: Partial<T>) {
    const clazz = plainToClass(CreatePostDto, Object.assign(this, entity));
    return await checkValidation(clazz);
  }
}
