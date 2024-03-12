import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "../posts/posts.service";

@Controller("boards")
export class BoardsController {
  constructor(private postsService: PostsService) {}

  @Get("/:id")
  async getPosts(@Param("id") id: number, @Query("search") search: string, @Query("page") page: any) {
    if (search === undefined) search = "";
    if (page === undefined) page = 1;
    else page = parseInt(page + "");

    const [posts, paginator] = await this.postsService.getPosts(id, page, search);

    return { posts, paginator };
  }
}
