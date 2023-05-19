import React, { useContext, useState } from 'react';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Context } from '../../defines';
import { ChatStyleType } from '@local/common';
import { changeCurrentChatTask } from 'src/store/state/actions';
import { Tooltip, IconButton } from '@mui/material';

const StyleSelector: React.FC = () => {
  const {
    currentChatTask: { style },
  } = useContext(Context);
  return (
    <Tooltip title={`风格：${ChatStyleType[style].name}`} arrow placement="top">
      <IconButton
        onClick={() => {
          changeCurrentChatTask((t) => {
            if (style === 'ACCURATE') {
              t.style = 'DEFAULT';
            }
            if (style === 'DEFAULT') {
              t.style = 'CREATIVE';
            }
            if (style === 'CREATIVE') {
              t.style = 'ACCURATE';
            }
          });
        }}
        size="small"
      >
        {style === 'ACCURATE' && <SentimentNeutralIcon />}
        {style === 'DEFAULT' && <SentimentSatisfiedIcon />}
        {style === 'CREATIVE' && <SentimentVerySatisfiedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default StyleSelector;
