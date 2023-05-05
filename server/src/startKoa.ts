import Koa from 'koa';
import Router from 'koa-router';
import bodyPaser from 'koa-body';
import http from 'http';
import path from 'path';
import fs from 'fs-extra';
import CSRF from 'koa-csrf';
import koaPushState from 'koa-push';
import staticServer from 'koa-static';
import cors from '@koa/cors';
import { MAX_FILE_SIZE, ROOT_PATH } from './configs';
import { main as controller } from './controllers/index';
import { nanoid } from 'nanoid';

const USE_SPA = true;

export function startKoa() {
  const app = new Koa();
  applyApp(app);
  return http.createServer(app.callback());
}

function applyApp(app: Koa) {
  app.use(cors());
  app.use(new CSRF());

  const htmlFrontendPath = path.join(ROOT_PATH, 'html/frontend');
  const htmlResourcesPath = path.join(ROOT_PATH, 'html/resources');
  fs.ensureDirSync(htmlFrontendPath);
  fs.ensureDirSync(htmlResourcesPath);

  if (USE_SPA) {
    app.use(koaPushState(htmlFrontendPath + '/index.html'));
  }

  app.use(
    staticServer(htmlFrontendPath, {
      maxAge: 30 * 24 * 3600 * 1000,
      immutable: true,
    })
  );

  app.use(
    staticServer(htmlResourcesPath, {
      maxAge: 30 * 24 * 3600 * 1000,
      immutable: true,
    })
  );

  // body解析，文件上传
  app.use(
    bodyPaser({
      jsonLimit: '100mb',
      multipart: true,
      formidable: {
        uploadDir: ROOT_PATH + '/html/resources',
        maxFileSize: MAX_FILE_SIZE * 1024 * 1024, // 100MB
        multiples: false,
        onFileBegin: (name, file) => {
          const { originalFilename } = file;
          const fileName = (originalFilename || '').replace(/[\/\\]/g, '');
          const ext = path.extname(fileName);
          // 使用原始名+随机文件名
          const newFilename =
            path.basename(fileName, ext) + '.' + nanoid() + ext;
          file.newFilename = newFilename;
          file.filepath = ROOT_PATH + '/html/resources/' + newFilename;
        },
      },
    })
  );

  // 路由
  const router = new Router();
  app.use(router.routes());
  controller(router);
}
