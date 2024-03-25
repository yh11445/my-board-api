import { PickType } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { checkValidation } from "@common/exceptions";
import { Posts } from "@entities/posts";

export class GetPostDto extends PickType(Posts, ["id", "board_id", "user_id", "title", "content", "writer", "created_at", "updated_at"]) {
  public async toEntity<T>(entity: Partial<T>) {
    const clazz = plainToClass(GetPostDto, Object.assign(this, entity));
    return await checkValidation(clazz);
  }
}
