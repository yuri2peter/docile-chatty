// 复制内容至剪切板
import ClipboardJS from 'clipboard';
import React, { ReactElement, useEffect } from 'react';
import { snackbarMessage } from 'src/hacks/snackbarMessage';

interface Props {
  text: string; // 要拷贝的字符串
  triggerSelector: string; // 触发元素的选择器
  // 如果改变了focus，需要额外设置，常见于Modal组件，如".MuiDialog-container"；document.activeElement可以查看focus元素
  containerSelector?: string;
  children: ReactElement; // 触发元素
  onSuccess?: boolean | (() => void);
  onError?: boolean | (() => void);
}

const Copy: React.FC<Props> = ({
  children,
  triggerSelector,
  text,
  containerSelector = '',
  onSuccess = true,
  onError = true,
}) => {
  useEffect(() => {
    const cp = new ClipboardJS(triggerSelector, {
      container: containerSelector
        ? document.querySelector(containerSelector) || document.body
        : undefined,
      text: () => text,
    });
    cp.on('success', () => {
      if (onSuccess === true) {
        snackbarMessage('复制成功', 'success');
      } else if (typeof onSuccess === 'function') {
        onSuccess();
      }
    });
    cp.on('error', () => {
      if (onError === true) {
        snackbarMessage('复制失败', 'error');
      } else if (typeof onError === 'function') {
        onError();
      }
    });
    return () => {
      cp.destroy();
    };
  }, [containerSelector, triggerSelector, text, onSuccess, onError]);

  return children;
};

export default Copy;
