import { Box, TextField } from '@mui/material';
import React, { KeyboardEventHandler, useCallback, useContext } from 'react';
import { CHAT_INPUT_ROWS } from '../../defines';
import BtnSend from './BtnSend';
import { changeStore, useStore } from 'src/store/state';
import { changeCurrentChatTask, processChat } from 'src/store/state/actions';
import Actions from './Actions';
import { useTextAreaEnterKey } from 'src/hooks/useTextAreaEnterKey';
import { getGlobalData } from 'src/store/globalData';
import { Context } from '../defines';

const Inputs: React.FC = () => {
  const { currentChatTask } = useContext(Context);
  const handleChange = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      changeCurrentChatTask((task) => {
        task.input.query = e.target.value;
      });
    },
    []
  );
  const handleKeyDown = useTextAreaEnterKey(processChat);
  return (
    <Box>
      <Actions />
      <TextField
        inputRef={(el) => {
          getGlobalData().inputMain = el;
        }}
        size="small"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="请输入提示词，按Enter键发送"
        value={currentChatTask.input.query}
        fullWidth
        multiline
        autoFocus
        spellCheck={false}
        rows={CHAT_INPUT_ROWS}
        sx={{
          padding: 1.2,
          '& textarea': {
            fontSize: 14,
          },
          '& fieldset': {
            border: 'none',
          },
        }}
      />
      <BtnSend />
    </Box>
  );
};

export default Inputs;
