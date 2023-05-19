import { Store, storeSchema } from './defines';
import { createSelector } from 'reselect';
import { throttle } from 'lodash';
import { getStore } from '.';
import defaultStoreValue from './defaultStoreValue';

const LOCAL_KEY = 'APP_DOCILE_CHATTY_STORE';
export const defaultStore: Store = loadStoreFromLocal();

export function saveStoreToLocal() {
  try {
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify(storeSchema.parse(getStore()))
    );
  } catch (error) {
    console.error('保存本地Store失败', error);
  }
}

export const saveStoreToLocalThrottled = throttle(saveStoreToLocal, 2000);

function loadStoreFromLocal() {
  try {
    const s = localStorage.getItem(LOCAL_KEY);
    const o = JSON.parse(s || '');
    const defaultStore1 = storeSchema.parse(o);
    console.log('加载本地Store');
    return defaultStore1;
  } catch (err) {
    console.warn('加载本地Store失败', err);
    console.log('初始化Store');
    return storeSchema.parse(defaultStoreValue);
  }
}

export const selectProcessingChatPairId = (d: Store) => d.processingChatPairId;
export const selectCurrentChatTaskId = (d: Store) => d.currentChatTaskId;
export const selectChatTasks = (d: Store) => d.chatTasks;
export const selectAnswerStatus = (d: Store) => d.answerStatus;
export const selectCurrentChatTask = (d: Store) => {
  return d.chatTasks.find((t) => t.id === d.currentChatTaskId);
};
export const selectProcessingChatTask = (d: Store) => {
  return selectChatTasks(d).find((t) =>
    t.history.find((p) => p.id === d.processingChatPairId)
  );
};
export const selectProcessingChatPair = (d: Store) => {
  return selectProcessingChatTask(d)?.history.find(
    (t) => t.id === d.processingChatPairId
  );
};

export const reselectIsPending = createSelector(
  selectAnswerStatus,
  (s) => s === 'pending'
);
export const reselectIsCurrentChatTaskPending = createSelector(
  [reselectIsPending, selectCurrentChatTask, selectProcessingChatPairId],
  (p, c, id) => {
    return p && c?.history.some((t) => t.id === id);
  }
);
export const reselectCurrentChatTask = createSelector(
  [selectChatTasks, selectCurrentChatTaskId],
  (chatTasks, currentChatTaskId) => {
    return chatTasks.find((t) => t.id === currentChatTaskId);
  }
);
export const reselectCurrentChatTaskInfoText = createSelector(
  [reselectCurrentChatTask],
  (currentChatTask) => {
    if (!currentChatTask) {
      return '';
    }
    const wordsCount = currentChatTask.history.reduceRight((prev, t) => {
      return prev + t.query.length + t.answer.length;
    }, 0);

    return `${currentChatTask.history.length}轮，${wordsCount}字`;
  }
);
