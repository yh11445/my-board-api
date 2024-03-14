import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  AfterLoad,
} from "typeorm";
import { Posts } from "./posts";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "src/common/decorators/common/property.decorator";
import { Users } from "./users";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  @NumProperty()
  id: number;

  @Column()
  @NumProperty()
  post_id: number;

  @Column()
  @NumProperty()
  user_id: number;

  @ManyToOne(() => Posts, (post) => post.id)
  @JoinColumn({ name: "post_id" })
  @ObjectProperty()
  post: Posts;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  @ObjectProperty()
  user: Users;

  @Column()
  @NumProperty()
  depth: number;

  @Column({ nullable: true })
  @NumProperty()
  parent_id: number | null;

  @Column()
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

  @AfterLoad()
  toDisplay() {
    this.writer = this.user?.username;
  }
}
