import { DateProperty, NumProperty, StringProperty } from "src/common/decorators/common/property.decorator";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Boards {
  @PrimaryGeneratedColumn()
  @NumProperty()
  id: number;

  @Column()
  @StringProperty()
  name: string;

  @CreateDateColumn()
  @DateProperty()
  created_at: Date;

  @UpdateDateColumn()
  @DateProperty()
  updated_at: Date;
}
