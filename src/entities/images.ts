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
  AfterLoad,
} from "typeorm";
import { Posts } from "@entities/posts";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "@common/decorators/common/property.decorator";
import { getS3SignedUrl } from "@utils/custom-s3-client";

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

  @StringProperty()
  signedUrl: string;

  @AfterLoad()
  async toDisplay() {
    this.signedUrl = await getS3SignedUrl(this.bucketname, this.filename);
  }
}
