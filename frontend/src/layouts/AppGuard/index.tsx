import { io } from 'socket.io-client';
import React, { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { IS_DEV, SERVER_ORIGIN, USE_SOCKET } from 'src/configs';
import debugLog from 'src/utils/debugLog';
import { handleSocketCreate } from 'src/store/state/actions';
import { getGlobalData } from 'src/store/globalData';
import { useSelector, useStore } from 'src/store/state';
import {
  saveStoreToLocalThrottled,
  reselectIsPending,
} from 'src/store/state/defaultStore';

function useSocket() {
  if (!USE_SOCKET) {
    return;
  }
  useLayoutEffect(() => {
    const socket = io(SERVER_ORIGIN, {
      reconnectionAttempts: IS_DEV ? 3 : undefined,
    });
    socket.on('connect', () => {
      debugLog('Socket connected.');
      socket.emit('login', getGlobalData().socketUserId);
    });
    socket.on('connect_error', () => {
      debugLog('Socket connect error.');
    });
    socket.on('disconnect', () => {
      debugLog('Socket disconnected.');
    });
    handleSocketCreate(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
}

function useAutoSave() {
  const store = useStore();
  const pending = useSelector(reselectIsPending);
  React.useEffect(saveStoreToLocalThrottled, [pending, store]);
}

const AppGuard: React.FC = () => {
  useSocket();
  useAutoSave();
  return <Outlet />;
};

export default AppGuard;
