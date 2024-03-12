import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "src/entities/posts";
import { Response } from "express";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async createPost(@Res() res: Response, @Body() post: Posts) {
    console.log(post);
    const newPost = await this.postsService.createPost(post);
    return newPost;
  }

  @Get("/:id")
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
