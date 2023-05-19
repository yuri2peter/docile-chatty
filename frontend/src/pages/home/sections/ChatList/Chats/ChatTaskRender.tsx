import {
  Box,
  ButtonBase,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { ItemRenderProps } from 'src/components/OrderListEditor';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import RowStack from 'src/components/RowStack';
import {
  CHATBOX_BGCOLOR,
  CHATLIST_BGCOLOR,
  CHAT_SELECTED_BGCOLOR,
} from '../../defines';
import { useSelector, useStore } from 'src/store/state';
import { selectProcessingChatTask } from 'src/store/state/defaultStore';
import {
  cloneIntoChatTask,
  enterChatTask,
  setDrawerOpen,
} from 'src/store/state/actions';
import { now } from 'lodash';
import { useTimer } from 'src/hooks/useTimer';
import { ChatTask } from '@local/common';
import SizerBox from 'src/components/SizerBox';
import { getArrLast } from 'src/utils/miscs';
import { useLayoutContext } from 'src/layouts/FlexLayout/sections/context';

const ChatTaskRender: React.FC<ItemRenderProps<ChatTask>> = ({
  item,
  handleDelete,
  isDragging,
  dragItemProps,
  dragHandleProps,
}) => {
  useTimer(10 * 1000);
  const { isMobile } = useLayoutContext();
  const { currentChatTaskId } = useStore();
  const processingChatTask = useSelector(selectProcessingChatTask);
  const dragHandle = (
    <Box
      {...dragHandleProps}
      className="dragHandle"
      sx={{
        cursor: 'grab',
        opacity: isMobile ? 1 : 0,
      }}
    >
      <DragIndicatorIcon fontSize="small" sx={{ display: 'block' }} />
    </Box>
  );

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={0}
      px={1.5}
      {...dragItemProps}
      sx={{
        backgroundColor: isDragging
          ? CHATBOX_BGCOLOR
          : currentChatTaskId === item.id
          ? CHAT_SELECTED_BGCOLOR
          : CHATLIST_BGCOLOR,
        '&:hover': {
          backgroundColor: CHATBOX_BGCOLOR,
          '& .dragHandle': {
            opacity: 1,
          },
          '& .btns': {
            display: 'flex',
          },
        },
      }}
    >
      {dragHandle}
      <Box flexGrow={1} height={84}>
        <SizerBox>
          <ButtonBase
            onClick={() => {
              enterChatTask(item.id);
              setDrawerOpen(false);
            }}
            sx={{ width: '100%', height: '100%' }}
          >
            <RowStack p={1.5} sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ width: '100%' }}>
                <Typography
                  align="left"
                  textOverflow={'ellipsis'}
                  variant="subtitle1"
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  width={`100%`}
                >
                  {now() - item.createdAt < 60 * 1000 && (
                    <FiberNewIcon
                      color="error"
                      sx={{ verticalAlign: 'sub', marginRight: 0.5 }}
                    />
                  )}
                  {item.title}
                </Typography>
                <Typography
                  align="left"
                  textOverflow={'ellipsis'}
                  variant="body2"
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                  width={`100%`}
                  color="text.secondary"
                >
                  {getArrLast(item.history)?.answer ||
                    getArrLast(item.history)?.query ||
                    '空对话'}
                </Typography>
              </Box>
            </RowStack>
          </ButtonBase>
        </SizerBox>
      </Box>
      <Stack
        className="btns"
        sx={{ display: isMobile ? 'flex' : 'none' }}
        direction={'row'}
        spacing={1}
      >
        <Tooltip title="拷贝" arrow placement="right">
          <IconButton
            disabled={processingChatTask?.id === item.id}
            size="small"
            onClick={() => {
              cloneIntoChatTask(item);
              setDrawerOpen(false);
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="关闭" arrow placement="right">
          <IconButton
            disabled={processingChatTask?.id === item.id}
            size="small"
            onClick={handleDelete}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default ChatTaskRender;
