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
import { Posts } from "./posts";
import { DateProperty, NumProperty, ObjectProperty, StringProperty } from "src/common/decorators/common/property.decorator";
import setting from "src/config/setting";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
    const s3 = new S3Client({
      region: setting.AWS.REGION,
      credentials: {
        accessKeyId: setting.AWS.ACCESS_KEY_ID,
        secretAccessKey: setting.AWS.SECRET_ACCESS_KEY,
      },
    });

    const getObjectParams: any = { Bucket: this.bucketname, Key: this.filename };
    const command: any = new GetObjectCommand(getObjectParams);

    this.signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5min
  }
}
