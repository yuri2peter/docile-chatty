import { Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import SendIcon from '@mui/icons-material/Send';
import RowStack from 'src/components/RowStack';
import { LIGHT_GREEN_COLOR } from '../../defines';
import { interrupt, processChat } from 'src/store/state/actions';
import { useSelector, useStore } from 'src/store/state';
import { reselectIsCurrentChatTaskPending } from 'src/store/state/defaultStore';
import CloseIcon from '@mui/icons-material/Close';
import InputPrefix from './InputPrefix';
import { Context } from '../defines';

const BtnSend: React.FC = () => {
  const { answerProcessing } = useStore();
  const isCurrentChatTaskPending = useSelector(
    reselectIsCurrentChatTaskPending
  );
  return (
    <RowStack paddingTop={0} pr={3} pb={1}>
      <InputPrefix />
      {isCurrentChatTaskPending ? (
        <Button
          disabled={!answerProcessing}
          onClick={interrupt}
          startIcon={<CloseIcon />}
          size="small"
          color="error"
          sx={{
            flexShrink: 0,
            width: 106,
            backgroundColor: 'rgb(233,233,233)',
          }}
        >
          <Typography variant="body2">中断</Typography>
        </Button>
      ) : (
        <Button
          disabled={answerProcessing}
          onClick={() => {
            processChat();
          }}
          startIcon={<SendIcon />}
          size="small"
          sx={{
            flexShrink: 0,
            color: LIGHT_GREEN_COLOR,
            width: 106,
            backgroundColor: 'rgb(233,233,233)',
          }}
        >
          <Typography variant="body2">
            {answerProcessing ? '忙碌' : '发送'}
          </Typography>
        </Button>
      )}
    </RowStack>
  );
};

export default BtnSend;
