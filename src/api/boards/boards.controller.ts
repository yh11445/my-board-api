import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "@api/posts/posts.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { getPostListSchema } from "@common/decorators/swagger/app/board.decorator";
import { PostResponse } from "@dto/posts/post.response";

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

    // const [posts, paginator] = await this.postsService.getPostsAndPaginator(id, page, search);
    const posts = PostResponse.toDto(await this.postsService.getPosts(id, page, search));
    const paginator = await this.postsService.getPaginator(id, page, search);
    // const postDtos = posts.map((post) => (post = PostResponse.toDto(post)));

    return { posts, paginator };
  }
}
