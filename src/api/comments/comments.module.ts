import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comments } from "@entities/comments";
import { CommentsController } from "@api/comments/comments.controller";
import { CommentsService } from "@api/comments/comments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
