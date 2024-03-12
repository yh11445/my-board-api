import { HttpAdapterHost } from "@nestjs/core";
import { join } from "path";
import { setSwaggerMiddleware } from ".";
import { AllExceptionsFilter, TypeOrmExceptionFilter, ValidationExceptionFilter } from "@common/filters";
import { SuccessInterceptor } from "@common/interceptors";
import { LoggingInterceptor } from "@common/interceptors";
import setting, { isProd } from "@config/setting";
import { NestFastifyApplication } from "@nestjs/platform-fastify";

import multipart from "@fastify/multipart";
import cors, { FastifyCorsOptions } from "@fastify/cors";

import * as handlebars from "handlebars";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import { STATIC_LIST } from "@constants/StaticConstants";
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ValidationException } from "../exceptions";

export async function adapter(app: NestFastifyApplication) {
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new TypeOrmExceptionFilter(httpAdapterHost),
    new ValidationExceptionFilter(httpAdapterHost)
  );
  app.useGlobalInterceptors(new SuccessInterceptor(), new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // dto 전환
      transformOptions: { enableImplicitConversion: true },
      whitelist: true, // only required validator output
      validateCustomDecorators: true, //custom decorators, validator too like ParamAndBody
      exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
    })
  );

  // REGISTER //
  app.register(multipart, {
    // attachFieldsToBody: true,
    addToBody: true,
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      // fields: 10, // Max number of non-file fields
      fileSize: setting.BODY_LIMIT, // For multipart forms, the max file size in bytes
      files: 10, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });
  app.setViewEngine({ engine: { handlebars }, templates: join(__dirname, "..", "..", "views") });
  STATIC_LIST.forEach((prefix) => app.useStaticAssets({ root: join(process.cwd(), prefix), prefix, decorateReply: false }));
  app.register(cors, (_: any) => {
    return (_: any, callback: (error: Error | null, options: FastifyCorsOptions) => void) => {
      const corsOption: FastifyCorsOptions = { origin: true, credentials: true };
      return callback(null, corsOption);
    };
  });
  app.register(fastifyCookie, { secret: setting.SESSION_SECRET, parseOptions: { httpOnly: true } });
  app.register(fastifySession, { secret: setting.SESSION_SECRET, cookie: { secure: isProd, httpOnly: true } });

  app.register(fastifyCsrfProtection);
  setSwaggerMiddleware(app);
}
