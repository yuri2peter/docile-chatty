import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Storyboard from './Storyboard';
import { useNoScale } from 'src/hooks/useNoScale';
import { useLayoutContext } from './context';
import { config } from '../config';

const FullScreenContent: React.FC = () => {
  const { isMobile } = useLayoutContext();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        flexShrink: 0,
        backgroundColor: '#ffffff',
      }}
    >
      {isMobile && config.enableMobileNoScaleHack && <MobileHack />}
      <Storyboard />
      <Outlet />
    </Box>
  );
};

const MobileHack: React.FC = () => {
  useNoScale();
  return null;
};

export default FullScreenContent;
