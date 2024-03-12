import { NestFactory } from "@nestjs/core";
import { AppModule } from "@api/app.module";
import { adapter } from "@common/middlewares";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { initializeTransactionalContext } from "typeorm-transactional";
import setting from "@config/setting";
import { winstonLogger } from "@common/loggers";

const PORT = setting.PORT || 4000;
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger: winstonLogger });
  adapter(app);

  await app.listen(PORT, "0.0.0.0");
  console.log(`http://localhost:${PORT}/api`);
}
bootstrap();
