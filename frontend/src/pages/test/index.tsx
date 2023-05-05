import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import CentralBox from 'src/components/CentralBox';
import NowUploader from 'src/components/NowUploader';

const TestPage = () => {
  const [stateValue, setStateValue] = useState('');
  return (
    <Stack height={1}>
      <CentralBox flexGrow={1}>
        <Box>
          <Typography variant="h3" align="center" color="black" mb={4}>
            Test Field
          </Typography>
          <NowUploader value={stateValue} onChange={setStateValue} />
        </Box>
      </CentralBox>
      <Typography align="center" mb={4}>
        <Typography
          component={RouterLink}
          variant="body1"
          color="#3f51b5"
          to="/"
          paragraph
        >
          Back to Home
        </Typography>
      </Typography>
    </Stack>
  );
};

export default TestPage;
