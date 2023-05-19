import { Socket } from 'socket.io-client';
import { changeStore, getStore } from '.';
import { z } from 'zod';
import axios from 'axios';
import { SERVER_ORIGIN } from 'src/configs';
import { getGlobalData } from '../globalData';
import { cloneDeep, now } from 'lodash';
import { storeSchema } from './defines';
import {
  ChatTask,
  chatTaskToChatParams,
  createDefaultChatTask,
} from '@local/common';
import { exportString, importString } from 'src/utils/textImport/textImport';
import {
  selectCurrentChatTask,
  selectProcessingChatPair,
  selectProcessingChatTask,
} from './defaultStore';
import { nanoid } from 'nanoid';
import { autoRenameWithIndex } from 'src/utils/miscs';

export function scrollChatBoxToBottom() {
  setTimeout(() => {
    const el = getGlobalData().chatPairsBox;
    if (el && !getGlobalData().mouseInChatPairs) {
      el.scrollTop = el.scrollHeight;
    }
  }, 1);
}

export function handleSocketCreate(socket: Socket) {
  checkProcessing();
  socket.on('chat_processing_update', (data) => {
    const processing = z.boolean().parse(data);
    changeStore((d) => {
      d.answerProcessing = processing;
    });
  });

  socket.on('chat_response_update', (data) => {
    const { taskId, response } = z
      .object({
        taskId: z.string(),
        response: z.string(),
      })
      .parse(data);
    changeStore((d) => {
      if (taskId === d.processingChatPairId) {
        const pair = selectProcessingChatPair(d);
        const chat = selectProcessingChatTask(d);
        if (pair) {
          pair.answer = response;
          if (chat?.id === d.currentChatTaskId) {
            scrollChatBoxToBottom();
          }
        }
      }
    });
  });

  socket.on('chat_response_finish', (data) => {
    const { taskId, success } = z
      .object({
        taskId: z.string(),
        success: z.boolean(),
      })
      .parse(data);
    changeStore((d) => {
      if (taskId === d.processingChatPairId) {
        d.answerStatus = success ? 'fulfilled' : 'rejected';
        d.processingChatPairId = '';
      }
    });
    scrollChatBoxToBottom();
  });
}

export async function checkProcessing() {
  const { data } = await axios.post(
    SERVER_ORIGIN + '/api/main/check-processing'
  );
  const { processing } = z.object({ processing: z.boolean() }).parse(data);
  changeStore((d) => {
    d.answerProcessing = processing;
  });
}

export async function processChat() {
  const currentChatTask = selectCurrentChatTask(getStore());
  if (!currentChatTask) {
    return;
  }
  await checkProcessing();
  const { data } = await axios.post(SERVER_ORIGIN + '/api/main/chat', {
    userId: getGlobalData().socketUserId,
    ...chatTaskToChatParams(currentChatTask),
  });
  const { taskId } = z.object({ taskId: z.string() }).parse(data);
  changeStore((d) => {
    d.processingChatPairId = taskId;
    d.answerProcessing = true;
    d.answerStatus = 'pending';

    const currentChatTask = selectCurrentChatTask(d);
    if (currentChatTask) {
      currentChatTask.history.push({
        id: taskId,
        ...currentChatTask.input,
        answer: '',
      });
      currentChatTask.input = {
        query: '',
        answerPrefix: '',
      };
    }
  });
  scrollChatBoxToBottom();
  getGlobalData().inputMain?.focus();
}

export async function interrupt() {
  const { processingChatPairId } = getStore();
  await axios.post(SERVER_ORIGIN + '/api/main/interrupt', {
    taskId: processingChatPairId,
  });
}

export function amend() {
  changeCurrentChatTask((currentChatTask) => {
    if (currentChatTask.history.length >= 1) {
      const p = currentChatTask.history.pop();
      currentChatTask.input = {
        query: p!.query,
        answerPrefix: p!.answerPrefix,
      };
    }
  });
}

export function regenerateAnswer() {
  changeCurrentChatTask((currentChatTask) => {
    if (currentChatTask.history.length >= 1) {
      const p = currentChatTask.history.pop();
      currentChatTask.input = {
        query: p!.query,
        answerPrefix: p!.answerPrefix,
      };
      requestAnimationFrame(() => {
        processChat();
      });
    }
  });
}

export function clearHistory() {
  changeStore((d) => {
    const currentChatTask = selectCurrentChatTask(d);
    if (currentChatTask) {
      currentChatTask.history = [];
    }
  });
}

export function revertOneChat() {
  changeStore((d) => {
    const currentChatTask = selectCurrentChatTask(d);
    if (currentChatTask) {
      currentChatTask.history.splice(-1, 1);
    }
  });
}

export function saveAsNewChatTask() {
  const currentChatTask = selectCurrentChatTask(getStore());
  if (currentChatTask) {
    cloneIntoChatTask(currentChatTask);
  }
}

export function cloneIntoChatTask(chatTask: ChatTask) {
  changeStore((d) => {
    const c = cloneDeep(chatTask);
    c.id = nanoid();
    c.title = autoRenameWithIndex(
      c.title,
      d.chatTasks.map((t) => t.title)
    );
    c.createdAt = now();
    c.history.forEach((t) => {
      t.id = nanoid();
    });
    d.chatTasks.unshift(c);
    d.currentChatTaskId = c.id;
  });
}

export function enterChatTask(id: string) {
  changeStore((d) => {
    d.currentChatTaskId = id;
  });
}

export function newChatTask() {
  cloneIntoChatTask(createDefaultChatTask());
}

export function exportFile() {
  exportString(JSON.stringify(getStore()), 'docile_chatty_data.json');
}

export function importFile() {
  importString((str) => {
    const obj = JSON.parse(str);
    const store = storeSchema.parse(obj);
    changeStore(() => {
      return store;
    });
  });
}

export function changeCurrentChatTask(cb: (task: ChatTask) => void) {
  changeStore((d) => {
    const c = selectCurrentChatTask(d);
    if (c) {
      cb(c);
    }
  });
}

export function toogleDrawerOpen() {
  changeStore((d) => {
    d.drawerOpen = !d.drawerOpen;
  });
}

export function setDrawerOpen(open: boolean) {
  changeStore((d) => {
    d.drawerOpen = open;
  });
}
