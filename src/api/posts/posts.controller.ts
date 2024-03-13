import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Transactional } from "typeorm-transactional";
import { createPostSchema, getPostSchema } from "src/common/decorators/swagger/app/post.decorator";
import { CreatePostDto } from "src/dto/create-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("api/posts")
@ApiBearerAuth()
@ApiTags("Posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @Transactional()
  @createPostSchema()
  async createPost(@Body() post: CreatePostDto) {
    // console.log(post);
    const newPost = await this.postsService.createPost(post);
    return newPost;
  }

  @Get("/:id")
  @getPostSchema()
  async getPost(@Param("id") id: number) {
    const post = await this.postsService.getPost(id);
    return post;
  }

  @Put("/:id")
  modifyPost(@Param("id") id: number, @Body() post) {
    const modifiedPost = this.postsService.modifyPost(id, post);
    return modifiedPost;
  }

  @Delete("/:id")
  deletePost(@Param("id") id: number) {
    return this.deletePost(id);
  }
}
