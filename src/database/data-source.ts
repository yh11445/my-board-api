import { ormconfig } from "@config/ormconfig";
import { DataSource } from "typeorm";

export const dataSource = new DataSource(ormconfig);
