import { PickType } from "@nestjs/swagger";
import { Comments } from "@entities/comments";

export class CreateCommentDto extends PickType(Comments, ["parent_id", "post_id", "user_id", "depth", "content"]) {}
