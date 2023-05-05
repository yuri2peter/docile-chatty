import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Stack } from '@mui/material';
import CentralBox from 'src/components/CentralBox';

const LearnMorePage = () => {
  return (
    <Stack height={1}>
      <CentralBox flexGrow={1}>
        <Box>
          <Typography variant="h6" align="center" color="black" mb={4}>
            React Frontend + NodeJS Server + Docker Deployment all in one
            project.
          </Typography>
          <Typography variant="body1">- TypeScript supported</Typography>
          <Typography variant="body1">
            - Webpack bundling of front-end and back-end source code
          </Typography>
          <Typography variant="body1">
            - Tool scripts for development and deployment
          </Typography>
          <Typography variant="subtitle2" mt={2}>
            See more information at{' '}
            <Link
              href="https://github.com/yuri2peter/web-aircraft-carrier"
              target={'_blank'}
            >
              https://github.com/yuri2peter/web-aircraft-carrier
            </Link>
            .
          </Typography>
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

export default LearnMorePage;
