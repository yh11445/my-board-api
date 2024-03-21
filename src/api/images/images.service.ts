import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Images } from "@entities/images";
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
