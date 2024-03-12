import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Boards } from "./boards";
import { Users } from "./users";
import { NumProperty, StringProperty } from "src/common/decorators/common/property.decorator";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @NumProperty()
  board_id: number;

  @Column()
  @NumProperty()
  user_id: number;

  @ManyToOne(() => Boards, (store) => store.id)
  @JoinColumn({ name: "board_id" })
  board: Boards;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "user_id" })
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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: "N" })
  deleted: string;
}
