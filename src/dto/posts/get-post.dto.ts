import { PickType } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { checkValidation } from "src/common/exceptions";
import { Posts } from "src/entities/posts";
import { Users } from "src/entities/users";

export class GetPostDto extends PickType(Posts, ["id", "board_id", "user_id", "title", "content", "writer", "created_at", "updated_at"]) {
  public async toEntity<T>(entity: Partial<T>) {
    const clazz = plainToClass(GetPostDto, Object.assign(this, entity));
    return await checkValidation(clazz);
  }
}
