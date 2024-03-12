import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormconfig } from "@config/ormconfig";
import { ScheduleModule } from "@nestjs/schedule";
import { AcceptLanguageResolver, CookieResolver, I18nModule } from "nestjs-i18n";
import { join } from "path";
import { addTransactionalDataSource } from "typeorm-transactional";
import { dataSource } from "@database/data-source";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
