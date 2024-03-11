import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entities/posts";
import setting from "./config/setting";
import { join } from "path";

console.log(`join(__dirname, "/../entities/**/*.entity{.ts,.js}")`, join(__dirname, "/../src/entities/**/*{.ts,.js}"));
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: setting.DATABASE.HOST,
      port: setting.DATABASE.PORT,
      username: setting.DATABASE.USERNAME,
      database: setting.DATABASE.NAME,
      password: setting.DATABASE.PASSWORD,
      entities: [join(__dirname, "/../src/entities/**/*{.ts,.js}")],
      // migrations: [join(__dirname, "./../database/migrations/*{.ts,.js}")],
      // seeds: [join(__dirname, "./../database/seeds/*{.ts,.js}")],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Posts]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
