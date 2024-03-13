import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Boards } from "./boards";
import { Users } from "./users";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "src/common/decorators/common/property.decorator";
import { Exclude } from "class-transformer";

@Entity()
export class Posts extends BaseEntity {
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

  @StringProperty()
  writer: string;

  @CreateDateColumn()
  @DateProperty()
  created_at: Date;

  @UpdateDateColumn()
  @DateProperty()
  updated_at: Date;

  @DeleteDateColumn()
  @DateProperty()
  deleted_at: Date;

  // @Column({ default: "N" })
  // @StringProperty()
  // @Exclude()
  // deleted: string;

  @AfterLoad()
  toDisplay() {
    this.writer = this.user?.username;
  }

  // async entityToDto(entity: Partial<Posts>) {
  //   const clazz = plainToClass(GetPostDto, entity);
  //   return await checkValidation(clazz);
  // }
}
