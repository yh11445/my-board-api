import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Transactional } from "typeorm-transactional";
import { createPostSchema, deletePostSchema, getPostSchema, updatePostSchema } from "src/common/decorators/swagger/app/post.decorator";
import { CreatePostDto } from "src/dto/posts/create-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdatePostDto } from "src/dto/posts/update-post.dto";
import { PostResponse } from "src/dto/posts/post.response";
import { GFXUploadedFile } from "src/common/decorators";
import path from "path";
import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import setting from "src/config/setting";
import { FastifyFile } from "src/common/types";

@Controller("api/posts")
@ApiBearerAuth()
@ApiTags("Posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @Transactional()
  @createPostSchema()
  async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postsService.createPost(post);
    return PostResponse.toDto(newPost);
  }

  @Post("/upload")
  async uploadFile(@GFXUploadedFile("filename") file: FastifyFile) {
    const s3 = new S3Client({
      region: setting.AWS.REGION,
      credentials: {
        accessKeyId: setting.AWS.ACCESS_KEY_ID,
        secretAccessKey: setting.AWS.SECRET_ACCESS_KEY,
      },
    });

    const bucketName = setting.AWS.BUCKET_NAME;

    // 파일 이름과 경로 설정
    const fileName = `${Date.now()}-${file.filename}`;

    try {
      // S3에 파일 업로드
      const uploadParams = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.data,
      };

      const uploadResult = await s3.send(new PutObjectCommand(uploadParams));

      // console.log(uploadResult);

      // 객체 URL 생성
      const objectUrl = `https://${bucketName}.s3.${setting.AWS.REGION}.amazonaws.com/${fileName}`;

      // 업로드 성공 응답
      return { success: true, message: "File uploaded successfully", filename: fileName };
    } catch (error) {
      // 업로드 실패 응답
      return { success: false, message: "Failed to upload file", error: error };
    }
  }

  @Get("/:id")
  @getPostSchema()
  async getPost(@Param("id") id: number) {
    const post = await this.postsService.getPost(id);
    return PostResponse.toDto(post);
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
