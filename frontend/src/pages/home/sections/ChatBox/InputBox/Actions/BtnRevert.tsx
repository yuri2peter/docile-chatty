import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useSelector } from 'src/store/state';
import UndoIcon from '@mui/icons-material/Undo';
import { revertOneChat } from 'src/store/state/actions';
import { reselectIsPending } from 'src/store/state/defaultStore';

// 撤回消息
const BtnRevert: React.FC = () => {
  const isPending = useSelector(reselectIsPending);
  return (
    <Tooltip title={'撤回消息'} arrow placement="top">
      <IconButton onClick={revertOneChat} disabled={isPending} size="small">
        <UndoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BtnRevert;
