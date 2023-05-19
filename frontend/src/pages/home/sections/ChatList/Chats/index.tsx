import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import OrderListEditor from 'src/components/OrderListEditor';
import { changeStore, useStore } from 'src/store/state';
import ChatTaskRender from './ChatTaskRender';
import { ChatTask } from '@local/common';

const Chats: React.FC = () => {
  const { chatTasks } = useStore();
  const handleChatTasksChanged = useCallback((v: ChatTask[]) => {
    changeStore((d) => {
      d.chatTasks = v;
    });
  }, []);
  return (
    <Box sx={{ overflow: 'auto' }}>
      <OrderListEditor
        value={chatTasks}
        onChange={handleChatTasksChanged}
        itemRender={(data) => {
          return <ChatTaskRender {...data} />;
        }}
        onCreate={() => {}}
      />
    </Box>
  );
};

export default Chats;
