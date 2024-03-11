import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Posts } from "./posts";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Posts)
  // @JoinColumn({ name: "id" })
  // post: Posts;

  @Column()
  depth: number;

  @Column()
  content: string;

  @Column()
  writer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
