import { defaultChatParams } from '@local/common';
import { chat } from '../api/chat';
import { Controller, Ctx } from '../types/controller';

export const test: Controller = (router) => {
  router.get('/api/test', async (ctx: Ctx) => {
    await chat(defaultChatParams, () => {});
    ctx.body = 'ok';
  });
};
