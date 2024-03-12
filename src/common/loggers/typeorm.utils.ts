import { QueryRunner } from "typeorm";
import { Logger as TypeOrmLogger } from "typeorm";
import { typeORMLogger } from "./";
export class CustomTypeOrmLogger implements TypeOrmLogger {
  private readonly logger = typeORMLogger;

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
    this.logger.log(level, message);
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(`[Migration] ${message}`);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.log(`[Query] ${query} ${parameters}`);
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.error(`[Query Error] ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.warn(`[Slow Query] ${time}ms: ${query}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(`[Schema Build] ${message}`);
  }
}
