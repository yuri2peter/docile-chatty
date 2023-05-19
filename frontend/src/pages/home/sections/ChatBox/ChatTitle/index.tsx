import { IconButton, TextField, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import React, { KeyboardEventHandler, useCallback, useContext } from 'react';
import { CHAT_TITLE_HEIGHT } from '../../defines';
import RowStack from 'src/components/RowStack';
import FlexFiller from '../../miscs/FlexFiller';
import {
  changeCurrentChatTask,
  saveAsNewChatTask,
  toogleDrawerOpen,
} from 'src/store/state/actions';
import { Context } from '../defines';
import { useLayoutContext } from 'src/layouts/FlexLayout/sections/context';

const ChatTitle: React.FC = () => {
  const { isMobile } = useLayoutContext();
  const { currentChatTask } = useContext(Context);
  const handleChange = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      changeCurrentChatTask((task) => {
        task.title = e.target.value;
      });
    },
    []
  );
  return (
    <RowStack
      sx={{
        height: CHAT_TITLE_HEIGHT,
        paddingX: 1.5,
      }}
    >
      {isMobile && (
        <IconButton
          onClick={toogleDrawerOpen}
          sx={{
            flexShrink: 0,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <TextField
        placeholder="对话"
        autoComplete="null"
        value={currentChatTask.title}
        onChange={handleChange}
        sx={{
          // width: '32em',
          '& fieldset': {
            border: 'none',
          },
          '& input': {
            fontSize: 18,
          },
        }}
      />
      <FlexFiller />
      <Tooltip title={'备份'} arrow placement="left">
        <IconButton
          onClick={saveAsNewChatTask}
          sx={{
            flexShrink: 0,
          }}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </RowStack>
  );
};

export default ChatTitle;
