import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Posts } from "./posts";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "src/common/decorators/common/property.decorator";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  @NumProperty()
  id: number;

  @Column()
  @NumProperty()
  post_id: number;

  @ManyToOne(() => Posts, (post) => post.id)
  @JoinColumn({ name: "post_id" })
  @ObjectProperty()
  post: Posts;

  @Column()
  @NumProperty()
  depth: number;

  @Column()
  @NumProperty()
  parent_id: number;

  @Column()
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
}
