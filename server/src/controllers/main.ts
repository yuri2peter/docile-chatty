import { z } from 'zod';
import {
  checkChatTaskProcessing,
  interruptChatTask,
  newChatTask,
} from '../libs/chat';
import { Controller, Ctx } from '../types/controller';
import { chatParamsSchema } from '@local/common';

export const main: Controller = (router) => {
  router.post('/api/main/chat', async (ctx: Ctx) => {
    const { userId, ...params } = z
      .object({
        userId: z.string(),
      })
      .extend(chatParamsSchema.shape)
      .parse(ctx.request.body);
    const taskId = newChatTask(params, userId);
    ctx.body = { taskId };
  });

  router.post('/api/main/check-processing', async (ctx: Ctx) => {
    ctx.body = { processing: checkChatTaskProcessing() };
  });

  router.post('/api/main/interrupt', async (ctx: Ctx) => {
    const { taskId } = z.object({ taskId: z.string() }).parse(ctx.request.body);
    await interruptChatTask(taskId);
    ctx.body = { ok: 1 };
  });
};
