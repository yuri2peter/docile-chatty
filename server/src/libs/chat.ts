// 对chat API进行二次封装，满足同一时间只有一个任务进行，更新全局状态

import { ChatParams } from '@local/common';
import { nanoid } from 'nanoid';
import { chat, interrupt } from '../api/chat';
import { sendSocketMsg } from '../startIO';

export const chatStatus: {
  userId?: string;
  taskId?: string;
  chatParams?: ChatParams;
  response?: string;
  processing: boolean;
} = {
  processing: false,
};

// 检查任务队列可用性
export function checkChatTaskProcessing() {
  return chatStatus.processing;
}

// 下发新的聊天任务
export function newChatTask(chatParams: ChatParams, userId: string) {
  if (checkChatTaskProcessing()) {
    throw new Error('当前聊天任务队列忙');
  }
  const taskId = nanoid();
  Object.assign(chatStatus, {
    chatParams,
    processing: true,
    taskId,
    userId,
  });
  sendSocketMsg({
    event: 'chat_processing_update',
    data: true,
  });
  chat(chatParams, (res) => {
    chatStatus.response = res;
    sendSocketMsg({
      userId,
      event: 'chat_response_update',
      data: {
        taskId,
        response: res,
      },
    });
  })
    .then(() => {
      sendSocketMsg({
        userId,
        event: 'chat_response_finish',
        data: {
          taskId,
          success: true,
        },
      });
    })
    .catch(() => {
      sendSocketMsg({
        userId,
        event: 'chat_response_finish',
        data: {
          taskId,
          success: false,
        },
      });
    })
    .finally(() => {
      sendSocketMsg({
        event: 'chat_processing_update',
        data: false,
      });
      Object.assign(chatStatus, {
        chatParams: undefined,
        processing: false,
        taskId: undefined,
        userId: undefined,
      });
    });
  return taskId;
}

// 中断指定聊天任务
export function interruptChatTask(id: string) {
  if (chatStatus.taskId === id) {
    interrupt();
    return true;
  } else {
    return false;
  }
}
