// user.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { PostsService } from "@api/posts/posts.service";

describe("PostsService", () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it("should return a user by id", async () => {
    const postId = 1;
    // PostsService의 getPost 메서드 호출
    const post = await service.getPost(postId);
    // 예상된 결과 확인
    console.log(post);
    // expect(user.id).toEqual(userId);
  });
});
