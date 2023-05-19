import { chatParamsSchema, chatTaskSchema } from '@local/common';
import { z } from 'zod';

export const storeSchema = z.object({
  chatTasks: z.array(chatTaskSchema),
  currentChatTaskId: z.string(),
  processingChatPairId: z.string(),
  answerProcessing: z.boolean(),
  drawerOpen: z.boolean(),
  answerStatus: z.enum(['pending', 'fulfilled', 'rejected']),
});

export type Store = z.infer<typeof storeSchema>;
