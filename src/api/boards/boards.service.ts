import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Boards } from "src/entities/boards";
import { Repository } from "typeorm";

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Boards) private boardRepository: Repository<Boards>) {}
}
