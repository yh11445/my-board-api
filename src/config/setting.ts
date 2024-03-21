// process.env.NODE_ENV --- // .env.local
// process.env.NODE_ENV --- // .env.dev

import * as dotenv from "dotenv";
import { join } from "path";
{
  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: join(process.cwd(), ".env.development") });
  } else if (process.env.NODE_ENV === "local") {
    dotenv.config({ path: join(process.cwd(), ".env.local") });
  } else {
    dotenv.config({ path: join(process.cwd(), ".env") });
  }
}

export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";

export default {
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    PORT: +process.env.DATABASE_PORT,
    NAME: process.env.DATABASE_NAME,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
  },
  PORT: process.env.PORT || 4000,
  LOCALE: process.env.LOCALE || "ko",
  BODY_LIMIT: 300 * 1024 * 1024,
  SESSION_SECRET: process.env.SESSION_SECRET || "a secret with minimum length of 32 characters",
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.AWS_REGION,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
};
