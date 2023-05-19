import React from 'react';
import { changeStore, useSelector, useStore } from 'src/store/state';
import NoChatTaskYet from './NoChatTaskYet';
import Chats from './Chats';
import { Box, Stack } from '@mui/material';
import { CHATBOX_BGCOLOR } from '../defines';
import Inputs from './InputBox';
import Divider2 from '../miscs/Divider2';
import ChatTitle from './ChatTitle';
import { reselectCurrentChatTask } from 'src/store/state/defaultStore';
import { Context } from './defines';

const ChatBox: React.FC = () => {
  const currentChatTask = useSelector(reselectCurrentChatTask);
  let content = currentChatTask ? (
    <Context.Provider
      value={{
        currentChatTask,
      }}
    >
      <Stack spacing={0} height={1}>
        <ChatTitle />
        <Divider2 />
        <Chats />
        <Divider2 />
        <Inputs />
      </Stack>
    </Context.Provider>
  ) : (
    <NoChatTaskYet />
  );
  return (
    <Box
      sx={{
        height: '100%',
        flexGrow: 1,
        backgroundColor: CHATBOX_BGCOLOR,
      }}
    >
      {content}
    </Box>
  );
};

export default ChatBox;
