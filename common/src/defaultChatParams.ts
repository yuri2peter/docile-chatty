import { ChatParams } from './chat';

export const defaultChatParams: ChatParams = {
  query: '你能做什么？',
  answer_prefix: '我能',
  max_length: 4096,
  top_p: 0.7,
  temperature: 1,
  history: [['你好，你是谁', '我是DocileChatty，一个人工智能助手。']],
};
