import { PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "@dto/posts/create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {}
