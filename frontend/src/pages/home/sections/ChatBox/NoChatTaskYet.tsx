import { Typography } from '@mui/material';
import React from 'react';
import CentralBox from 'src/components/CentralBox';

const NoChatTaskYet: React.FC = () => {
  return (
    <CentralBox height={1}>
      <Typography>未选择对话</Typography>
    </CentralBox>
  );
};

export default NoChatTaskYet;
