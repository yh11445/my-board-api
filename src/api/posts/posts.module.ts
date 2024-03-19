import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "src/entities/posts";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Images } from "src/entities/images";
import { ImagesService } from "../images/images.service";

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Images])],
  controllers: [PostsController],
  providers: [PostsService, ImagesService],
})
export class PostsModule {}
