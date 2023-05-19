import ora from 'ora';
import { fetchEventSource } from '@fortaine/fetch-event-source';
import { CREATIVE_CHAT_GLM_API_ORIGIN } from '../configs';
import { z } from 'zod';
import axios from 'axios';
import { ChatParams } from '@local/common';

export async function chat(
  { timeout, ...chatApiParams }: ChatParams,
  onResponse: (res: string) => void
) {
  console.log(
    `Q: ${chatApiParams.query}\nA: ${chatApiParams.answer_prefix}...`
  );
  const spinner = ora(chatApiParams.query).start();
  const ctrl = new AbortController();
  const timerTimeout = setTimeout(() => {
    interrupt();
  }, timeout * 1000);
  await fetchEventSource(CREATIVE_CHAT_GLM_API_ORIGIN + '/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatApiParams),
    signal: ctrl.signal,
    onmessage(ev) {
      const res_1 = chatResponseParse(ev.data);
      spinner.text = `[${res_1.length}] ${res_1}`;
      onResponse(res_1);
    },
    onerror(err) {
      console.error(err);
      ctrl.abort();
      spinner.fail();
    },
    onclose() {},
  }).finally(() => {
    clearTimeout(timerTimeout);
  });
  spinner.succeed();
}
export function interrupt() {
  return axios.post(CREATIVE_CHAT_GLM_API_ORIGIN + '/interrupt');
}

function chatResponseParse(res: string) {
  // [
  //   [
  //     ['你是谁', '我是一只猫娘'],
  //     [
  //       '你喜欢做什么？',
  //       '<span style="color:red">我平时</span>喜欢窝在主人身边，和主人玩耍，享受主人的关爱和呵护。',
  //     ],
  //   ],
  //   '',
  //   '',
  // ]
  return [res]
    .map((t) => JSON.parse(t))
    .map((t) =>
      z
        .tuple([
          z.array(z.tuple([z.string(), z.string()])),
          z.literal(''),
          z.literal(''),
        ])
        .parse(t)
    )
    .map((t) => t[0])
    .map((t) => t[t.length - 1])
    .map((t) => t[1])[0];
}
