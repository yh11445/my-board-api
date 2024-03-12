import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Posts } from "./posts";
import { NumProperty } from "src/common/decorators/common/property.decorator";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @NumProperty()
  post_id: number;

  @ManyToOne(() => Posts, (post) => post.id)
  @JoinColumn({ name: "post_id" })
  post: Posts;

  @Column()
  depth: number;

  @Column()
  parent_id: number;

  @Column()
  content: string;

  @Column()
  writer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
