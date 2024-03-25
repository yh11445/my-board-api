import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Images } from "@entities/images";
import { ImagesService } from "@api/images/images.service";

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  controllers: [],
  providers: [ImagesService],
})
export class ImagesModule {}
