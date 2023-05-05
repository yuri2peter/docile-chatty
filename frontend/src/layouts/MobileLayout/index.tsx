import { Box } from '@mui/material';
import { useResizeDetector } from 'react-resize-detector';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { use100vh } from 'react-div-100vh';
import Storyboard from './Storyboard';
import { MobileLayoutContext } from './context';

const size1 = 420;
const size2 = 960;

/**
 * 手机布局
 * 显示广告页
 * 检测是否横屏
 * PC浏览器限制宽高
 */
const MobileLayout: React.FC<{}> = () => {
  const height100vh = use100vh();
  const { width, height, ref } = useResizeDetector();
  const isPortrait = width && height ? width < height : true;
  const isLandscape = !isPortrait;
  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: 'black',
        width: '100vw',
        height: height100vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          position: 'relative',
          flexGrow: 1,
          maxWidth: isPortrait ? size1 : size2,
          maxHeight: isPortrait ? size2 : size1,
          padding: 1,
          border: '1px solid #dcdcdc88',
          overflow: 'hidden',
        }}
      >
        <Storyboard />
        <MobileLayoutContext.Provider
          value={{
            isPortrait,
            isLandscape,
          }}
        >
          <Outlet />
        </MobileLayoutContext.Provider>
      </Box>
    </Box>
  );
};

export default MobileLayout;
