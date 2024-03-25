import { PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "@dto/comments/create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
