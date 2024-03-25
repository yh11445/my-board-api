import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import setting from "src/config/setting";

const s3 = new S3Client({
  region: setting.AWS.REGION,
  credentials: {
    accessKeyId: setting.AWS.ACCESS_KEY_ID,
    secretAccessKey: setting.AWS.SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (bucketName: string, fileName: string, fileData: Buffer) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileData,
  };

  await s3.send(new PutObjectCommand(uploadParams));
};

export const getS3SignedUrl = async (bucketName: string, fileName: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  return await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5min
};
