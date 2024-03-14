import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle("Deploy API DOCS")
      .setVersion("1.0")
      .addBearerAuth({ type: "http", scheme: "bearer", name: "JWT", in: "header" })
      .build();
  }
}

export function setSwaggerMiddleware(app: NestFastifyApplication) {
  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api", app, document, { swaggerOptions: { defaultModelsExpandDepth: -1 } });
}
