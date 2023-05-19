import { TextField } from '@mui/material';
import React, { KeyboardEventHandler, useCallback, useContext } from 'react';
import { useTextAreaEnterKey } from 'src/hooks/useTextAreaEnterKey';
import { changeCurrentChatTask, processChat } from 'src/store/state/actions';
import { LIGHT_BLUE_COLOR } from '../../defines';
import { Context } from '../defines';

const InputPrefix: React.FC = () => {
  const { currentChatTask } = useContext(Context);
  const handleChange = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      changeCurrentChatTask((task) => {
        task.input.answerPrefix = e.target.value;
      });
    },
    []
  );
  const handleKeyDown = useTextAreaEnterKey(processChat);
  return (
    <>
      <TextField
        size="small"
        spellCheck={false}
        placeholder="诱导词（可选）"
        fullWidth
        autoComplete="null"
        multiline
        rows={1}
        value={currentChatTask.input.answerPrefix}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        sx={{
          paddingX: 1.2,
          '& textarea': {
            fontSize: 14,
            color: LIGHT_BLUE_COLOR,
          },
          '& fieldset': {
            border: 'none',
          },
        }}
      />
    </>
  );
};

export default InputPrefix;
