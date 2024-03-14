import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "src/entities/posts";
import { Repository } from "typeorm";
import paginator from "src/utils/paginators";
import { CreatePostDto } from "src/dto/posts/create-post.dto";
import { UpdatePostDto } from "src/dto/posts/update-post.dto";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postRepository: Repository<Posts>) {}

  createPost(post: CreatePostDto) {
    return this.postRepository.save(post);
  }

  async getPost(id: number) {
    const post = await this.postRepository.findOne({ where: { id }, relations: { user: true } });

    return post;
  }

  async getPostsAndPaginator(boardId: number, page: number, search: string): Promise<any[]> {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const formattedSearch = `%${search}%`;

    const posts = await this.postRepository
      .createQueryBuilder("posts")
      .select()
      .where("posts.board_id = :boardId AND posts.title LIKE :formattedSearch", { boardId, formattedSearch })
      .orderBy("posts.created_at", "DESC")
      .offset(offset)
      .limit(perPage)
      .getMany();

    const totalCount = await this.postRepository
      .createQueryBuilder("posts")
      .where("posts.board_id = :boardId AND posts.title LIKE :formattedSearch", { boardId, formattedSearch })
      .orderBy("posts.created_at", "DESC")
      .getCount();

    const paginatorObj = paginator({
      totalCount: totalCount,
      page,
      perPage,
    });

    return [posts, paginatorObj];
  }

  async modifyPost(id: number, _post: UpdatePostDto) {
    const updateResult = await this.postRepository.update({ id }, _post);
    if (updateResult !== null) {
      // 업데이트 처리 제대로 안됐을 경우인데 조건문 수정필요
      return await this.getPost(id);
    } else {
      return null;
    }
  }

  async deletePost(id: number) {
    const deleteResult = this.postRepository.softDelete(id);
    if (deleteResult !== null) {
      // 삭제 처리 제대로 안됐을 경우인데 조건문 수정필요
      return true;
    } else {
      return false;
    }
  }
}
