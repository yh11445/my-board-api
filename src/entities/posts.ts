import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Boards } from "./boards";
import { Users } from "./users";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "src/common/decorators/common/property.decorator";
import { GetPostDto } from "src/dto/get-post.dto";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  @NumProperty()
  id: number;

  @Column()
  @NumProperty()
  board_id: number;

  @Column()
  @NumProperty()
  user_id: number;

  @ManyToOne(() => Boards, (store) => store.id)
  @JoinColumn({ name: "board_id" })
  @ObjectProperty()
  board: Boards;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  @ObjectProperty()
  user: Users;

  @Column()
  @StringProperty()
  title: string;

  @Column({ type: "text" })
  @StringProperty()
  content: string;

  @Column()
  @StringProperty()
  writer: string;

  @CreateDateColumn()
  @DateProperty()
  created_at: Date;

  @UpdateDateColumn()
  @DateProperty()
  updated_at: Date;

  @Column({ default: "N" })
  @StringProperty()
  deleted: string;

  // static convertEntityToDto(entity: Posts): GetPostDto {
  //   const dto = new GetPostDto();
  //   dto.id = entity.id;
  //   dto.board_id = entity.board_id;
  //   dto.user_id = entity.user_id;
  //   dto.title = entity.title;
  //   dto.content = entity.content;
  //   dto.writer = entity.writer;
  //   dto.created_at = entity.created_at;
  //   dto.updated_at = entity.updated_at;
  //   dto.deleted = entity.deleted;
  //   return dto;
  // }
}
