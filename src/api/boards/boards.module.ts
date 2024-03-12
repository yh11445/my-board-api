import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "src/entities/posts";
import { BoardsController } from "./boards.controller";
import { PostsService } from "../posts/posts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [BoardsController],
  providers: [PostsService],
})
export class BoardsModule {}
