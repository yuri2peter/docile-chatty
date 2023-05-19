import Router from 'koa-router';
import { test } from './test';
import { upload } from './upload';
import { main } from './main';

export function comb(router: Router<any, {}>) {
  test(router);
  upload(router);
  main(router);
}
