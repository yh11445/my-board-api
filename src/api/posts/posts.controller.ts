import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Transactional } from "typeorm-transactional";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
  uploadFileSchema,
} from "src/common/decorators/swagger/app/post.decorator";
import { CreatePostDto } from "src/dto/posts/create-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdatePostDto } from "src/dto/posts/update-post.dto";
import { PostResponse } from "src/dto/posts/post.response";
import { GFXUploadedFile2 } from "src/common/decorators";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import setting from "src/config/setting";
import { FastifyFile } from "src/common/types";
import { Images } from "src/entities/images";
import { ImagesService } from "../images/images.service";

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
  async uploadFiles(@Param("id") id: number, @GFXUploadedFile2("files") files: FastifyFile[]) {
    const s3 = new S3Client({
      region: setting.AWS.REGION,
      credentials: {
        accessKeyId: setting.AWS.ACCESS_KEY_ID,
        secretAccessKey: setting.AWS.SECRET_ACCESS_KEY,
      },
    });

    const bucketName = setting.AWS.BUCKET_NAME;

    for (const file of files) {
      // 파일 이름 설정
      const fileName = `${Date.now()}-${file.filename}`;

      try {
        // S3에 파일 업로드
        const uploadParams = {
          Bucket: bucketName,
          Key: fileName,
          Body: file.data,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        const image = new Images();
        image.post_id = id;
        image.bucketname = bucketName;
        image.filename = fileName;

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
    const images = await this.imagesService.getSignedImageUrls(id);
    const postDto = PostResponse.toDto(post);
    return { postDto, images };
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
