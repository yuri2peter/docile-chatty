import { Typography } from '@mui/material';
import React from 'react';
import { useSelector, useStore } from 'src/store/state';
import { reselectCurrentChatTaskInfoText } from 'src/store/state/defaultStore';

const Info: React.FC = () => {
  const text = useSelector(reselectCurrentChatTaskInfoText);
  return (
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  );
};

export default Info;
