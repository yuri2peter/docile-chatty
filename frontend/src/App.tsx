import React from 'react';
import { SnackbarProvider } from 'notistack';
import { StoreProvider } from './store/state';
import MainRoute from './routes';
import Hacks from './hacks/Hacks';

function App() {
  return (
    <SnackbarProvider autoHideDuration={1500}>
      <StoreProvider>
        <Hacks />
        <MainRoute />
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default App;
