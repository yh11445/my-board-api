import { Module } from "@nestjs/common";
import { AppService } from "@api/app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormconfig } from "@config/ormconfig";
import { ScheduleModule } from "@nestjs/schedule";
import { AcceptLanguageResolver, CookieResolver, I18nModule } from "nestjs-i18n";
import { join } from "path";
import { addTransactionalDataSource } from "typeorm-transactional";
import { dataSource } from "@database/data-source";
import { PostsModule } from "@api/posts/posts.module";
import { BoardsModule } from "@api/boards/boards.module";
import { CommentsModule } from "@api/comments/comments.module";
import { ImagesModule } from "@api/images/images.module";
import { AuthModule } from "@api/auth/auth.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: "ko",
      loaderOptions: {
        path: join(__dirname, "../i18n/"),
        watch: true,
      },
      resolvers: [CookieResolver, AcceptLanguageResolver],
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return ormconfig;
      },
      async dataSourceFactory(options) {
        if (!options) throw new Error("Invalid options passed");
        return addTransactionalDataSource(dataSource);
      },
    }),
    PostsModule,
    BoardsModule,
    CommentsModule,
    ImagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
