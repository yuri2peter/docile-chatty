import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useStore } from 'src/store/state';
import { regenerateAnswer } from 'src/store/state/actions';

// 重新生成回复
const BtnReGen: React.FC = () => {
  const { answerProcessing } = useStore();
  return (
    <Tooltip title={'重新生成'} arrow placement="top">
      <IconButton
        onClick={regenerateAnswer}
        disabled={answerProcessing}
        size="small"
      >
        <AutorenewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BtnReGen;
