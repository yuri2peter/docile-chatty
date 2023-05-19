import { Box } from '@mui/material';
import React from 'react';
import Background from './Background';
import { useLayoutContext } from './context';

const ParentBox: React.FC<{
  sizerRef: any;
  height: number;
  children: React.ReactNode;
}> = ({ sizerRef, height, children }) => {
  const { mode } = useLayoutContext();
  return (
    <Box
      ref={sizerRef}
      sx={{
        width: '100vw',
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {mode !== 'INIT' && <Background />}
      {children}
    </Box>
  );
};

export default ParentBox;
