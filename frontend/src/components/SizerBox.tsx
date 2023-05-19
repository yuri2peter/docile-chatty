// 监测父容器尺寸，返回宽高，以绝对定位定位渲染子容器
import { Box } from '@mui/material';
import React from 'react';
import { useResizeDetector } from 'react-resize-detector';

type Children1 = (props: { width: number; height: number }) => React.ReactNode;
type Children2 = React.ReactNode;

const SizerBox: React.FC<{
  children?: Children1 | Children2;
}> = ({ children }) => {
  if (!children) {
    return null;
  }
  if (typeof children === 'function') {
    return <SizerBox1 children={children} />;
  } else {
    return <SizerBox2 children={children} />;
  }
};

const boxProps1 = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'visible',
};
const boxProps2 = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  overflow: 'auto',
};

const SizerBox1: React.FC<{
  children: Children1;
}> = ({ children }) => {
  const { width, height, ref } = useResizeDetector();
  return (
    <Box sx={boxProps1} ref={ref}>
      <Box sx={boxProps2}>
        {width && height ? children({ width, height }) : null}
      </Box>
    </Box>
  );
};

const SizerBox2: React.FC<{
  children: Children2;
}> = ({ children }) => {
  return (
    <Box sx={boxProps1}>
      <Box sx={boxProps2}>{children}</Box>
    </Box>
  );
};

export default SizerBox;
