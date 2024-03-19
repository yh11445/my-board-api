import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Images } from "src/entities/images";
import { ImagesService } from "./images.service";

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  controllers: [],
  providers: [ImagesService],
})
export class ImagesModule {}
