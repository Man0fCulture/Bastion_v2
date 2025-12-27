/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly SESSION_SECRET: string;
  readonly S3_BUCKET: string;
  readonly S3_REGION: string;
  readonly S3_ACCESS_KEY: string;
  readonly S3_SECRET_KEY: string;
  readonly S3_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user: import('./lib/types').User | null;
  }
}
