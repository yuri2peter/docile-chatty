import React from 'react';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { clearHistory } from 'src/store/state/actions';
import { Tooltip, IconButton } from '@mui/material';
import { useSelector } from 'src/store/state';
import { reselectIsPending } from 'src/store/state/defaultStore';

// 回到上一个状态
const BtnClearHistory: React.FC = () => {
  const isPending = useSelector(reselectIsPending);
  return (
    <Tooltip title={'清空历史'} arrow placement="top">
      <IconButton onClick={clearHistory} disabled={isPending} size="small">
        <CleaningServicesIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BtnClearHistory;
