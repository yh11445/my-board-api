import { PickType } from "@nestjs/swagger";
import { Posts } from "src/entities/posts";

export class GetPostDto extends PickType(Posts, ["id", "board_id", "user_id", "title", "content", "writer", "created_at", "updated_at", "deleted"]) {}
