import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "../posts/posts.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { getPostListSchema } from "src/common/decorators/swagger/app/board.decorator";

@Controller("api/boards")
@ApiBearerAuth()
@ApiTags("Boards")
export class BoardsController {
  constructor(private postsService: PostsService) {}

  @Get("/:id")
  @getPostListSchema()
  async getPosts(@Param("id") id: number, @Query("search") search: string, @Query("page") page: any) {
    if (search === undefined) search = "";
    if (page === undefined) page = 1;
    else page = parseInt(page + "");

    const [posts, paginator] = await this.postsService.getPosts(id, page, search);

    return { posts, paginator };
  }
}
