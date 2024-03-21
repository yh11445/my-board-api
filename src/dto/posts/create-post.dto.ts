import { PickType } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { checkValidation } from "@common/exceptions";
import { Posts } from "@entities/posts";

export class CreatePostDto extends PickType(Posts, ["board_id", "user_id", "title", "content"]) {
  public async toEntity<T>(entity: Partial<T>) {
    const clazz = plainToClass(CreatePostDto, Object.assign(this, entity));
    return await checkValidation(clazz);
  }
}
