import { WinstonModule, utilities } from "nest-winston";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const dailyOption = (level: string, module?: string) => {
  const dirname = module ? `./logs/${module}/${level}` : `./logs/${level}`;
  return {
    level,
    datePattern: "YYYY-MM-DD",
    dirname,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.timestamp(),
      utilities.format.nestLike(process.env.NODE_ENV, { colors: false, prettyPrint: true })
    ),
  };
};

const winstonOptions = (module?: string) => ({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "http" : "silly",
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(process.env.NODE_ENV, { colors: true, prettyPrint: true })
      ),
    }),
    new winstonDaily(dailyOption("log", module)),
    new winstonDaily(dailyOption("info", module)),
    new winstonDaily(dailyOption("warn", module)),
    new winstonDaily(dailyOption("error", module)),
  ],
});
export const typeORMLogger = WinstonModule.createLogger(winstonOptions("typeorm"));
export const winstonLogger = WinstonModule.createLogger(winstonOptions());
