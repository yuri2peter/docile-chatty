import Router from 'koa-router';
import { test } from './test';
import { upload } from './upload';

export function main(router: Router<any, {}>) {
  test(router);
  upload(router);
}
