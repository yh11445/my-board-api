import { PickType } from "@nestjs/swagger";
import { Posts } from "src/entities/posts";

export class CreatePostDto extends PickType(Posts, ["board_id", "user_id", "title", "content", "writer"]) {}
