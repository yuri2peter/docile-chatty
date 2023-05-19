import React from 'react';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useLayoutContext } from './context';
import Storyboard from './Storyboard';

const WindowContent: React.FC = () => {
  const { width, height } = useLayoutContext();
  return (
    <Paper
      sx={{
        backgroundColor: '#ffffff',
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
      elevation={16}
    >
      <Storyboard />
      <Outlet />
    </Paper>
  );
};

export default WindowContent;
