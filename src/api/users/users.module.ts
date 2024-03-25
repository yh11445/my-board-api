import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "@entities/users";
import { UsersController } from "@api/users/users.controller";
import { UsersService } from "@api/users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
