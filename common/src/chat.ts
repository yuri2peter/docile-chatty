import { nanoid } from 'nanoid';
import { z } from 'zod';
import { now } from 'lodash';

// 聊天记录
export const chatHistorySchema = z
  .array(z.tuple([z.string(), z.string()]))
  .default([]);

export type ChatHistory = z.infer<typeof chatHistorySchema>;

// 定义chat参数模式
export const chatParamsSchema = z.object({
  query: z.string().default('Hello'),
  answer_prefix: z.string().default(''),
  max_length: z.number().int().min(64).max(4096).default(256),
  top_p: z.number().min(0).max(1).default(0.7),
  temperature: z.number().min(0).max(2).default(1.0),
  history: chatHistorySchema,
  timeout: z.number().min(1).max(120).default(60),
});

export type ChatParams = z.infer<typeof chatParamsSchema>;

// 定义“聊天对”参数模式
export const chatPairSchema = z.object({
  id: z.string().default(nanoid),
  query: z.string().default(''),
  answer: z.string().default(''),
  answerPrefix: z.string().default(''),
});

export type ChatPair = z.infer<typeof chatPairSchema>;

// 定义“聊天任务”参数模式
export const chatTaskSchema = z.object({
  id: z.string().default(nanoid),
  title: z.string().default('主标题'),
  style: z.enum(['ACCURATE', 'DEFAULT', 'CREATIVE']).default('DEFAULT'),
  history: z.array(chatPairSchema).default([]),
  input: z.object({
    query: z.string().default(''),
    answerPrefix: z.string().default(''),
  }),
  createdAt: z.number().default(now),
});

export type ChatTask = z.infer<typeof chatTaskSchema>;

export function chatTaskToChatParams(chatTask: ChatTask) {
  const { history, input, style } = chatTaskSchema.parse(chatTask);
  const rel: ChatParams = {
    query: input.query,
    answer_prefix: input.answerPrefix,
    max_length: 4096,
    top_p: ChatStyleType[style].value.top_p,
    temperature: ChatStyleType[style].value.temperature,
    history: history.map((t) => [t.query, t.answer]),
    timeout: 60,
  };
  return chatParamsSchema.parse(rel);
}

export const ChatStyleType = {
  ACCURATE: {
    name: '精确',
    value: {
      top_p: 0.5,
      temperature: 0.6,
    },
  },
  DEFAULT: {
    name: '默认',
    value: {
      top_p: 0.7,
      temperature: 1,
    },
  },
  CREATIVE: {
    name: '创造',
    value: {
      top_p: 0.9,
      temperature: 1.4,
    },
  },
};
