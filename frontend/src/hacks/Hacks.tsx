import React from 'react';
import { DialogConfirmHack } from './comfirm';
import { NavigationHack } from './navigate';
import { SnackbarHack } from './snackbarMessage';
import { WorkerHack } from './worker';

const Hacks: React.FC = () => {
  return (
    <>
      <SnackbarHack />
      <NavigationHack />
      <DialogConfirmHack />
      <WorkerHack />
    </>
  );
};

export default Hacks;
