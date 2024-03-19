import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  BaseEntity,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Posts } from "./posts";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "src/common/decorators/common/property.decorator";

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  @NumProperty()
  id: number;

  @Column()
  @NumProperty()
  post_id: number;

  @Column()
  @StringProperty()
  bucketname: string;

  @Column()
  @StringProperty()
  filename: string;

  @ManyToOne(() => Posts, (post) => post.id)
  @JoinColumn({ name: "post_id" })
  @ObjectProperty()
  post: Posts;

  @CreateDateColumn()
  @DateProperty()
  created_at: Date;

  @UpdateDateColumn()
  @DateProperty()
  updated_at: Date;

  @DeleteDateColumn()
  @DateProperty()
  deleted_at: Date;
}
