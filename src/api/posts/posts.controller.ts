import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Transactional } from "typeorm-transactional";
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from "src/common/decorators/swagger/app/post.decorator";
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

  @Post("/upload")
  async uploadFile(@Body() req: Express.Request) {
    const file: Express.Multer.File = req.file;
    console.log(file.originalname);
    return { message: "File uploaded successfully" };
  }

  @Get("/:id")
  @getPostSchema()
  async getPost(@Param("id") id: number) {
    const post = await this.postsService.getPost(id);
    return PostResponse.toDto(post);
  }

  @Put("/:id")
  @Transactional()
  @updatePostSchema()
  async modifyPost(@Param("id") id: number, @Body() post: UpdatePostDto) {
    const result = await this.postsService.modifyPost(id, post);
    if (result !== null) {
      return PostResponse.toDto(result);
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
