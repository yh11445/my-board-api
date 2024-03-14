import { entityToDto } from "src/common/decorators/swagger/common";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Transactional } from "typeorm-transactional";
import { createPostSchema, getPostSchema } from "src/common/decorators/swagger/app/post.decorator";
import { CreatePostDto } from "src/dto/posts/create-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdatePostDto } from "src/dto/posts/update-post.dto";
import { PostResponse } from "src/dto/posts/post.response";

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
    return PostResponse.toDto(newPost);
  }

  @Get("/:id")
  @getPostSchema()
  async getPost(@Param("id") id: number) {
    const post = await this.postsService.getPost(id);
    const data = PostResponse.toDto(post);
    return { data };
  }

  @Put("/:id")
  @Transactional()
  modifyPost(@Param("id") id: number, @Body() post: UpdatePostDto) {
    const modifiedPost = this.postsService.modifyPost(id, post);
    return modifiedPost;
  }

  @Delete("/:id")
  @Transactional()
  deletePost(@Param("id") id: number) {
    return this.postsService.deletePost(id);
  }
}
