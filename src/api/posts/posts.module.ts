import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "@entities/posts";
import { PostsController } from "@api/posts/posts.controller";
import { PostsService } from "@api/posts/posts.service";
import { Images } from "@entities/images";
import { ImagesService } from "@api/images/images.service";

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Images])],
  controllers: [PostsController],
  providers: [PostsService, ImagesService],
})
export class PostsModule {}
