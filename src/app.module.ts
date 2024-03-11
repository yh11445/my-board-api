import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormconfig } from "./config/ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return ormconfig;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
