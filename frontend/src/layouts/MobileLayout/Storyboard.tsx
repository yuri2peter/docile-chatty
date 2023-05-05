import { Box, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CentralBox from 'src/components/CentralBox';
import { MobileLayoutContext } from './context';

const Storyboard: React.FC = () => {
  const textColor = '#eeeeee';
  const [show, setShow] = useState(true);
  const { isPortrait } = useContext(MobileLayoutContext);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3500);
  }, []);
  if (!show) {
    return null;
  }
  return (
    <Box
      onClick={() => {
        setShow(false);
      }}
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        background: '#434056',
      }}
      className="animate__animated animate__fadeOut animate__delay-3s animate__faster"
    >
      <CentralBox
        sx={{
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <img
            src={'/logos/512.png'}
            title="logo"
            width={isPortrait ? 180 : 120}
            style={{
              borderRadius: 16,
              boxShadow: '4px 4px 15px 2px rgb(0 0 0 / 40%)',
            }}
          />
          <Box height={isPortrait ? 24 : 12}></Box>
          <Typography
            variant="h5"
            color={textColor}
            sx={{ textShadow: '2px 2px 4px rgb(0 0 0 / 50%)' }}
            className="animate__animated animate__fadeInDown "
          >
            Web Aircraft Carrier
          </Typography>
          <Typography
            variant="subtitle1"
            color={textColor}
            align="center"
            sx={{ textShadow: '2px 2px 4px rgb(0 0 0 / 50%)', paddingX: 3 }}
            className="animate__animated animate__fadeInDown animate__delay-1s"
          >
            React Frontend + NodeJS Server + Docker Deployment all in one
            project.
          </Typography>
        </Stack>
      </CentralBox>
    </Box>
  );
};

export default Storyboard;
