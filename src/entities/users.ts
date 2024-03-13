import { DateProperty, NumProperty, StringProperty } from "src/common/decorators/common/property.decorator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @NumProperty()
  id: number;

  @Column({ unique: true })
  @StringProperty()
  email: string;

  @Column()
  @StringProperty()
  username: string;

  @CreateDateColumn()
  @DateProperty()
  created_at: Date;

  @UpdateDateColumn()
  @DateProperty()
  updated_at: Date;
}
