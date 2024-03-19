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

  async getSignedImageUrls(postId: number) {
    const images = await this.imageRepository.find({ where: { post_id: postId } });

    const s3 = new S3Client({
      region: setting.AWS.REGION,
      credentials: {
        accessKeyId: setting.AWS.ACCESS_KEY_ID,
        secretAccessKey: setting.AWS.SECRET_ACCESS_KEY,
      },
    });

    const signedUrls = [];
    for (const image of images) {
      const bucketName = setting.AWS.BUCKET_NAME;
      const getObjectParams: any = { Bucket: bucketName, Key: image.filename };
      const command: any = new GetObjectCommand(getObjectParams);
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 1800 }); // 1800s
      signedUrls.push(signedUrl);
    }

    return signedUrls;
  }
}
