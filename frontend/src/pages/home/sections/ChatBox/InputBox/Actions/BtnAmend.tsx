import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { amend } from 'src/store/state/actions';

const BtnAmend: React.FC = () => {
  return (
    <Tooltip title={'修订问题'} arrow placement="top">
      <IconButton onClick={amend} size="small">
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BtnAmend;
