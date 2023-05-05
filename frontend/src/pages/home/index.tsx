import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import CentralBox from 'src/components/CentralBox';

const HomePage = () => {
  return (
    <Stack height={1}>
      <CentralBox flexGrow={1}>
        <Box>
          <Typography variant="h2" align="center" color="black">
            Web Aircraft Carrier
          </Typography>
          <Typography variant="body1" align="center" mt={3}>
            One project for EVERYTHING you needed
          </Typography>
        </Box>
      </CentralBox>
      <Typography align="center" mb={4}>
        <Typography
          component={RouterLink}
          variant="body1"
          color="#3f51b5"
          to="/learn-more"
          paragraph
        >
          Learn More
        </Typography>
      </Typography>
    </Stack>
  );
};

export default HomePage;
