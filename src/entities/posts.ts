import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Boards } from "./boards";
import { Users } from "./users";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Boards)
  // @JoinColumn({ name: "id" })
  // board: Boards;

  // @ManyToOne(() => Users)
  // @JoinColumn({ name: "id" })
  // user: Users;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  writer: string;

  @CreateDateColumn()
  createdDt: Date;

  @UpdateDateColumn()
  updatedDt: Date;

  @Column({ default: "N" })
  deleted: string;
}
