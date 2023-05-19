import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  CHATBOX_BGCOLOR,
  CHAT_TITLE_HEIGHT,
  LIGHT_GREEN_COLOR,
} from '../../defines';
import RowStack from 'src/components/RowStack';
import FlexFiller from '../../miscs/FlexFiller';
import {
  exportFile,
  importFile,
  newChatTask,
  setDrawerOpen,
} from 'src/store/state/actions';
import { useSelector } from 'src/store/state';
import { reselectIsPending } from 'src/store/state/defaultStore';

const Head: React.FC = () => {
  const isPending = useSelector(reselectIsPending);
  return (
    <RowStack
      flexShrink={0}
      pl={3}
      pr={0.5}
      sx={{
        height: CHAT_TITLE_HEIGHT,
        backgroundColor: CHATBOX_BGCOLOR,
      }}
    >
      <Button
        disabled={isPending}
        onClick={() => {
          newChatTask();
          setDrawerOpen(false);
        }}
        startIcon={<AddIcon />}
        size="small"
        sx={{
          flexShrink: 0,
          color: LIGHT_GREEN_COLOR,
          width: 106,
          backgroundColor: 'rgb(233,233,233)',
        }}
      >
        <Typography variant="body2">新对话</Typography>
      </Button>
      <FlexFiller />
      <Tooltip title="导入数据" arrow placement="bottom">
        <IconButton size="small" disabled={isPending} onClick={importFile}>
          <PublishIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="导出数据" arrow placement="bottom">
        <IconButton size="small" disabled={isPending} onClick={exportFile}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
    </RowStack>
  );
};

export default Head;
