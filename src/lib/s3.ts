import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: import.meta.env.S3_REGION,
  endpoint: import.meta.env.S3_ENDPOINT || undefined,
  credentials: {
    accessKeyId: import.meta.env.S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.S3_SECRET_KEY
  },
  forcePathStyle: !!import.meta.env.S3_ENDPOINT
});

const BUCKET = import.meta.env.S3_BUCKET;

export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType
    })
  );

  return key;
}

export async function deleteFile(key: string): Promise<void> {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key
    })
  );
}

export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

export function generateAssetPhotoKey(assetId: string, filename: string): string {
  const ext = filename.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  return `assets/${assetId}/${timestamp}.${ext}`;
}

export function generateEmployeePhotoKey(matricule: string): string {
  return `employees/${matricule}.jpg`;
}
