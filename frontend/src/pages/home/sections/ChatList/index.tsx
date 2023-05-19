import { Drawer, Stack } from '@mui/material';
import React from 'react';
import { CHATLIST_BGCOLOR, CHAT_LIST_BOX_WIDTH } from '../defines';
import Chats from './Chats';
import Divider2 from '../miscs/Divider2';
import Head from './Head';
import { useLayoutContext } from 'src/layouts/FlexLayout/sections/context';
import { toogleDrawerOpen } from 'src/store/state/actions';
import { useStore } from 'src/store/state';

const ChatList: React.FC = () => {
  const { isMobile } = useLayoutContext();
  const { drawerOpen } = useStore();
  const content = (
    <>
      <Head />
      <Divider2 />
      <Chats />
    </>
  );
  return isMobile ? (
    <Drawer open={drawerOpen} onClose={toogleDrawerOpen}>
      <Stack
        spacing={0}
        sx={{
          width: '80vw',
          height: '100%',
          flexShrink: 0,
          backgroundColor: CHATLIST_BGCOLOR,
          '& button svg': { fontSize: 18 },
        }}
      >
        {content}
      </Stack>
    </Drawer>
  ) : (
    <Stack
      spacing={0}
      sx={{
        height: '100%',
        flexShrink: 0,
        width: CHAT_LIST_BOX_WIDTH,
        backgroundColor: CHATLIST_BGCOLOR,
        '& button svg': { fontSize: 18 },
      }}
    >
      {content}
    </Stack>
  );
};

export default ChatList;
