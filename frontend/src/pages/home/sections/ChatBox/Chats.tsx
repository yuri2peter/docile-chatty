import { Avatar, Paper, Stack, TextField } from '@mui/material';
import React, { useContext, useRef } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FaceIcon from '@mui/icons-material/Face';
import RowStack from 'src/components/RowStack';
import {
  BOT_AVATA_BGCOLOR,
  BOT_CHAT_BGCOLOR,
  HUMAN_AVATA_BGCOLOR,
  HUMAN_CHAT_BGCOLOR,
} from '../defines';
import { Context } from './defines';
import { changeCurrentChatTask } from 'src/store/state/actions';
import { useStore } from 'src/store/state';
import { getGlobalData } from 'src/store/globalData';

const Chats: React.FC = () => {
  const { processingChatPairId } = useStore();
  const { currentChatTask } = useContext(Context);
  const refBox = useRef(null);
  getGlobalData().chatPairsBox = refBox.current;
  return (
    <Stack
      ref={refBox}
      spacing={2}
      flexGrow={1}
      padding={3}
      overflow={'auto'}
      onMouseEnter={() => {
        getGlobalData().mouseInChatPairs = true;
      }}
      onMouseLeave={() => {
        getGlobalData().mouseInChatPairs = false;
      }}
    >
      {currentChatTask.history.map((t, i) => {
        return (
          <React.Fragment key={t.id}>
            <RightChat
              text={t.query}
              onChange={(text) => {
                changeCurrentChatTask((task) => {
                  task.history[i].query = text;
                });
              }}
            />
            <LeftChat
              text={t.answer}
              onChange={(text) => {
                changeCurrentChatTask((task) => {
                  const p = task.history[i];
                  if (processingChatPairId !== p.id) {
                    task.history[i].answer = text;
                  }
                });
              }}
            />
          </React.Fragment>
        );
      })}
    </Stack>
  );
};

// human chat
const RightChat: React.FC<{
  text: string;
  onChange: (text: string) => void;
}> = ({ text, onChange }) => {
  return (
    <RowStack alignItems={'flex-start'} direction={'row-reverse'}>
      <Avatar sx={{ bgcolor: HUMAN_AVATA_BGCOLOR }}>
        <FaceIcon />
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '16px 0 16px 16px',
          background: HUMAN_CHAT_BGCOLOR,
        }}
      >
        <ChatText text={text} onChange={onChange} />
      </Paper>
    </RowStack>
  );
};

// bot chat
const LeftChat: React.FC<{
  text: string;
  onChange: (text: string) => void;
}> = ({ text, onChange }) => {
  return (
    <RowStack alignItems={'flex-start'}>
      <Avatar sx={{ bgcolor: BOT_AVATA_BGCOLOR }}>
        <SmartToyIcon />
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '0 16px 16px 16px',
          background: BOT_CHAT_BGCOLOR,
        }}
      >
        <ChatText text={text} onChange={onChange} />
      </Paper>
    </RowStack>
  );
};

const ChatText: React.FC<{
  text: string;
  onChange: (text: string) => void;
}> = ({ text, onChange }) => {
  return (
    <TextField
      size="small"
      spellCheck={false}
      placeholder="..."
      fullWidth
      autoComplete="null"
      multiline
      value={text}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      sx={{
        width: 280,
        '& textarea': {
          fontSize: 14,
        },
        '& fieldset': {
          border: 'none',
        },
      }}
    />
  );
};

export default Chats;
