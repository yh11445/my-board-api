import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "@entities/posts";
import { BoardsController } from "@api/boards/boards.controller";
import { PostsService } from "@api/posts/posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [BoardsController],
  providers: [PostsService],
})
export class BoardsModule {}
