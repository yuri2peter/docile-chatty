import React from 'react';
import { ChatTask } from '@local/common';

export const Context = React.createContext(
  {} as {
    currentChatTask: ChatTask;
  }
);
