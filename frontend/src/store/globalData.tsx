// 全局内存数据引用（非react状态管理）

import { nanoid } from 'nanoid';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GlobalData {
  socketUserId: string;
  inputMain: HTMLTextAreaElement | null;
  chatPairsBox: HTMLDivElement | null;
  mouseInChatPairs: boolean;
}

const data: GlobalData = getInitialGlobalData();

// 获取全局data的引用
export function getGlobalData(): GlobalData {
  return data;
}

// 重置为初始状态
export function resetGlobalData() {
  Object.assign(data, getInitialGlobalData());
}

// 空数据模板
function getInitialGlobalData(): GlobalData {
  return {
    socketUserId: nanoid(),
    chatPairsBox: null,
    inputMain: null,
    mouseInChatPairs: false,
  };
}
