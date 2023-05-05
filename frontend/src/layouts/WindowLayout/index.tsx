import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { use100vh } from 'react-div-100vh';

// 尺寸
const scale = 4;
const size1 = 297 * scale;
const size2 = 210 * scale;

// 背景
// const bgGradient =
//   'linear-gradient(to bottom right, #006566, #498f77, #528752)';

const bgImage = 'url(/backgrounds/low-poly-grid-haikei.svg)';

/**
 * 窗口布局
 */
const WindowLayout: React.FC<{}> = () => {
  const height100vh = use100vh();
  return (
    <Box
      sx={{
        background: bgImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100vw',
        height: height100vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
      }}
    >
      <Paper
        sx={{
          backgroundColor: '#ffffffdf',
          backdropFilter: 'blur(24px)',
          width: size1,
          height: size2,
          position: 'relative',
          overflow: 'hidden',
        }}
        elevation={16}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default WindowLayout;
