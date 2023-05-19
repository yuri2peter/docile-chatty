import { now } from 'lodash';
import { nanoid } from 'nanoid';
import { chatTaskSchema } from './chat';

export function createDefaultChatTask() {
  return chatTaskSchema.parse({
    id: nanoid(),
    title: '新对话',
    input: { query: '', answerPrefix: '' },
    createdAt: now(),
  });
}
