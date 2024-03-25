import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostsService } from "@api/posts/posts.service";
import { Transactional } from "typeorm-transactional";
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema, uploadFileSchema } from "@common/decorators/swagger/app/post.decorator";
import { CreatePostDto } from "@dto/posts/create-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdatePostDto } from "@dto/posts/update-post.dto";
import { PostResponse } from "@dto/posts/post.response";
import { UploadedFile } from "@common/decorators";
import setting from "@config/setting";
import { FastifyFile } from "@common/types";
import { Images } from "@entities/images";
import { ImagesService } from "@api/images/images.service";
import { ImageResponse } from "@dto/images/image.response";
import { uploadToS3 } from "@utils/custom-s3-client";
import { Builder } from "builder-pattern";

@Controller("api/posts")
@ApiBearerAuth()
@ApiTags("Posts")
export class PostsController {
  constructor(private postsService: PostsService, private imagesService: ImagesService) {}

  @Post()
  @Transactional()
  @createPostSchema()
  async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postsService.createPost(post);
    return PostResponse.toDto(newPost);
  }

  @Post("/:id/upload")
  @Transactional()
  @uploadFileSchema()
  async uploadFiles(@Param("id") id: number, @UploadedFile("files") files: FastifyFile[]) {
    const bucketName = setting.AWS.BUCKET_NAME;

    for (const file of files) {
      const fileName = `${Date.now()}-${file.filename}`;

      try {
        await uploadToS3(bucketName, fileName, file.data);

        const image = Builder<Images>().post_id(id).bucketname(bucketName).filename(fileName).build();

        await this.imagesService.createImage(image);
      } catch (error) {
        // 업로드 실패 응답
        return { success: false, message: "Failed to upload file", error: error };
      }
    }

    // 업로드 성공 응답
    return { success: true, message: "Files uploaded successfully" };
  }

  @Get("/:id")
  @getPostSchema()
  async getPost(@Param("id") id: number) {
    const post = await this.postsService.getPost(id);
    const images = await this.imagesService.getImages(id);
    const postDto = PostResponse.toDto(post);
    const imageDtos = ImageResponse.toDto(images);

    return { postDto, imageDtos };
  }

  @Put("/:id")
  @Transactional()
  @updatePostSchema()
  async modifyPost(@Param("id") id: number, @Body() post: UpdatePostDto) {
    const result = await this.postsService.modifyPost(id, post);
    if (result !== null) {
      return PostResponse.toDto(result);
    } else {
      return null;
    }
  }

  @Delete("/:id")
  @Transactional()
  @deletePostSchema()
  deletePost(@Param("id") id: number) {
    return this.postsService.deletePost(id);
  }
}
