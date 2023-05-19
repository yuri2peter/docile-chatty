import { Box } from '@mui/material';
import React from 'react';
import { DIVIDER_COLOR2 } from '../defines';

const Divider2: React.FC = () => {
  return (
    <Box
      sx={{
        height: '1px',
        bgcolor: DIVIDER_COLOR2,
      }}
    />
  );
};

export default Divider2;
