import { PickType } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { isArray } from "class-validator";
import { Images } from "src/entities/images";

export class ImageResponse extends PickType(Images, ["signedUrl"]) {
  static toDto(entity: Partial<Images> | Partial<Images[]>) {
    if (isArray(entity)) {
      return entity.map((image) => plainToClass(ImageResponse, image));
    } else {
      return plainToClass(ImageResponse, entity);
    }
  }
}
