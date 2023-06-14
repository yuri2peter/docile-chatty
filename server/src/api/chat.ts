import ora from 'ora';
import { CREATIVE_CHAT_GLM_API_ORIGIN } from '../configs';
import { z } from 'zod';
import axios from 'axios';
import { ChatParams } from '@local/common';
import { Readable } from 'stream';

export async function chat(
  chatApiParams: ChatParams,
  onResponse: (res: string) => void,
  timeoutSeconds = 60
) {
  console.log(
    `Q: ${chatApiParams.query}\nA: ${chatApiParams.answer_prefix}...`
  );

  const spinner = ora(chatApiParams.query).start();
  const { data: readable } = await axios.post<Readable>(
    CREATIVE_CHAT_GLM_API_ORIGIN + '/stream',
    chatApiParams,
    {
      timeout: 5000, // 流请求的timeout指的是最小间隔时间，而不是总时间
      responseType: 'stream',
    }
  );
  const timerTimeout = setTimeout(() => {
    readable.destroy(new Error(`Timeout(${timeoutSeconds}s)`));
  }, timeoutSeconds * 1000);
  await handleReadableStream(readable, (str) => {
    const jsonStr = str.replace(/^data: /, '');
    const text = chatResponseParse(jsonStr);
    spinner.text = text;
    onResponse(text);
  })
    .then(() => {
      spinner.succeed();
    })
    .catch(() => {
      spinner.fail();
    });
  clearTimeout(timerTimeout);
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

function handleReadableStream(
  readable: Readable,
  onData = (str: string) => {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    // 消息处理
    readable.on('data', (chunk) => {
      onData(chunk.toString());
    });

    // 错误处理
    readable.on('error', (error) => {
      reject(error);
    });

    // 结束处理
    readable.on('end', () => {
      resolve();
    });
  });
}
