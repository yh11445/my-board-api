import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "src/entities/posts";
import { Repository } from "typeorm";
import paginator from "../../utils/paginators";
import { CreatePostDto } from "src/dto/create-post.dto";
import { UpdatePostDto } from "src/dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postRepository: Repository<Posts>) {}

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
    // const posts = await this.postRepository
    //   .createQueryBuilder()
    //   .select("*")
    //   .from(Posts, "posts")
    //   .where("board_id = :boardId AND title LIKE :search", { boardId, search })
    //   .orderBy("created_at", "DESC")
    //   .offset(offset)
    //   .limit(perPage)
    //   .getMany();

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
      return true;
    } else {
      return false;
    }
  }
}
