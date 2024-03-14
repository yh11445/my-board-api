import { entityToDto } from "src/common/decorators/swagger/common";
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Transactional } from "typeorm-transactional";
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from "src/common/decorators/swagger/app/post.decorator";
import { CreatePostDto } from "src/dto/create-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetPostDto } from "src/dto/get-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";

@Controller("api/posts")
@ApiBearerAuth()
@ApiTags("Posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @Transactional()
  @createPostSchema()
  async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postsService.createPost(post);
    const data = await entityToDto(GetPostDto, newPost);
    return { data };
  }

  @Get("/:id")
  @getPostSchema()
  async getPost(@Param("id") id: number) {
    const post = await this.postsService.getPost(id);
    const data = await entityToDto(GetPostDto, post);
    return { data };
  }

  @Put("/:id")
  @Transactional()
  @updatePostSchema()
  async modifyPost(@Param("id") id: number, @Body() post: UpdatePostDto) {
    const result = await this.postsService.modifyPost(id, post);
    if (result !== null) {
      const data = await entityToDto(GetPostDto, result);
      return { data };
    } else {
      return null;
    }
  }

  @Delete("/:id")
  @Transactional()
  @deletePostSchema()
  deletePost(@Param("id") id: number) {
    return this.postsService.deletePost(id);
  }
}
