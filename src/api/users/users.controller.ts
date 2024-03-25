import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/api/users/users.service";

@Controller("api/users")
@ApiBearerAuth()
@ApiTags("Users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUser() {
    return this.usersService.getUser();
  }
}
