import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@api/auth/auth.controller";
import { GoogleStrategy } from "@api/auth/strategies/google.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AuthController],
  providers: [GoogleStrategy, SessionSerializer],
})
export class AuthModule {}
