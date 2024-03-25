import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "@entities/users";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

  async getUser() {
    return "Hello World!";
  }
}
