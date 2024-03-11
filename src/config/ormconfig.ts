import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { join } from "path";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import setting from "./setting";
import { Posts } from "src/entities/posts";
const synchronize = process.env.NODE_ENV === "local";
export const ormconfig: TypeOrmModuleOptions & SeederOptions & DataSourceOptions = {
  type: "mysql",
  host: setting.DATABASE.HOST,
  port: setting.DATABASE.PORT,
  username: setting.DATABASE.USERNAME,
  password: setting.DATABASE.PASSWORD,
  database: setting.DATABASE.NAME,
  entities: [Posts],
  // entities: [join(__dirname, "/../entities/**/*.entity{.ts,.js}")],
  // migrations: [join(__dirname, "./../database/migrations/*{.ts,.js}")],
  // seeds: [join(__dirname, "./../database/seeds/*{.ts,.js}")],
  synchronize,
  logging: true,
  extra: {
    connectionLimit: 300,
    charset: "utf8mb4_unicode_ci",
  },
};
