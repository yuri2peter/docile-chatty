import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';

const envFile = path.join(__dirname, '../.env');
fs.ensureFileSync(envFile);

dotenv.config({ path: envFile });

const env = process.env as unknown as {
  PORT?: string;
  MAX_FILE_SIZE?: string;
};

export const IS_PROD = process.env.NODE_ENV === 'production';
export const ROOT_PATH: string = path.resolve(__dirname, '../');
export const PORT = Number(env.PORT || 3000);
process.env.PORT = String(PORT);
export const MAX_FILE_SIZE = Number(env.MAX_FILE_SIZE || 1); // 文件上传大小上限，默认1MB
export const USE_SPA = true;
