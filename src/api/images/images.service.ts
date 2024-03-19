import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import setting from "src/config/setting";
import { Images } from "src/entities/images";
import { Repository } from "typeorm";

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Images) private imageRepository: Repository<Images>) {}

  async createImage(image: Images) {
    return await this.imageRepository.save(image);
  }

  async getImages(postId: number) {
    return await this.imageRepository.find({ where: { post_id: postId } });
  }
}
