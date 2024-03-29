import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "src/entities/posts";
import { Repository } from "typeorm";
import paginator from "../../utils/paginators";
import { CreatePostDto } from "src/dto/create-post.dto";
import { Transactional } from "typeorm-transactional";
import { UpdatePostDto } from "src/dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postRepository: Repository<Posts>) {}

  @Transactional()
  createPost(post: CreatePostDto): Promise<Posts> {
    return this.postRepository.save(post);
  }

  async getPost(id: number) {
    const post = await this.postRepository.findOne({ where: { id }, relations: { user: true } });

    return post;
  }

  async getPosts(boardId: number, page: number, search: string) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const query = `SELECT * FROM posts 
        WHERE board_id = ? AND title LIKE ? AND deleted = 'N'
        ORDER BY created_at DESC LIMIT ?, ?`;

    // '%' + search + '%' 형태로 검색어를 포함한 문자열로 변경
    const formattedSearch = `%${search}%`;

    const [posts, totalCount] = await Promise.all([
      this.postRepository.query(query, [boardId, formattedSearch, offset, perPage]),
      this.postRepository.query(`SELECT COUNT(*) as count FROM posts WHERE board_id = ? AND title LIKE ? AND deleted = 'N'`, [
        boardId,
        formattedSearch,
      ]),
    ]);

    const paginatorObj = paginator({
      totalCount: totalCount[0].count,
      page,
      perPage,
    });

    return [posts, paginatorObj];
  }

  async modifyPost(id: number, _post: UpdatePostDto) {
    return this.postRepository.update({ id }, _post);
  }

  async deletePost(id: number) {
    return this.postRepository.softDelete(id);
    // const post = await this.getPost(id);
    // post.deleted = "Y";

    // const result = this.postRepository.save(post);
    // if (result !== null) return true;
    // else return false;
  }
}
