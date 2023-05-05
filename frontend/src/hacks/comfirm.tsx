import React, { useCallback } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';
import { useImmer } from 'src/hooks/useImmer';

const refHack = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  current: (title: string, content: string) => {
    return new Promise<void>((_, reject) => {
      reject();
    });
  },
};

interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  onAgreen: () => void;
  onCancle: () => void;
}

export const DialogConfirmHack: React.FC<{}> = () => {
  const [dialogProps, changeDialogProps] = useImmer({
    open: false,
    title: '',
    content: '',
    onAgreen: () => {},
    onCancle: () => {},
  });
  const handleClose = useCallback(() => {
    changeDialogProps((d) => {
      d.open = false;
    });
  }, [changeDialogProps]);
  const newConfirm = useCallback(
    (title: string, content: string) => {
      return new Promise<void>((resolve, reject) => {
        changeDialogProps((d) => {
          Object.assign(d, {
            open: true,
            title,
            content,
            onAgreen: () => {
              handleClose();
              resolve();
            },
            onCancle: () => {
              handleClose();
              reject();
            },
          });
        });
      });
    },
    [changeDialogProps, handleClose]
  );
  refHack.current = newConfirm;
  return <AlertDialog {...dialogProps} />;
};

export function dialogConfirm(
  title = '确认操作?',
  content = '该操作将不可撤销。'
) {
  return refHack.current(title, content);
}

const AlertDialog: React.FC<DialogProps> = ({
  open,
  title,
  content,
  onAgreen,
  onCancle,
}) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onCancle} fullWidth maxWidth="xs">
      <Box sx={{ p: 1, py: 1.5 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Grid item>
            <DialogTitle>{title}</DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={onCancle}>
              <CloseOutlined />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onCancle}>
            取消
          </Button>
          <Button variant="contained" onClick={onAgreen} autoFocus>
            确定
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
