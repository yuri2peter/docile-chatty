import { Box } from '@mui/material';
import ChatList from './sections/ChatList';
import ChatBox from './sections/ChatBox';
import RowStack from 'src/components/RowStack';
import { DIVIDER_COLOR1 } from './sections/defines';

const HomePage = () => {
  return (
    <RowStack
      height={1}
      spacing={0}
      sx={{
        '& button svg': { fontSize: 18 },
      }}
    >
      <ChatList />
      <Box width={'1px'} height={1} bgcolor={DIVIDER_COLOR1} />
      <ChatBox />
    </RowStack>
  );
};

export default HomePage;
