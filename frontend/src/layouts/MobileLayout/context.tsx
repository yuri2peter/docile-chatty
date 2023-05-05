import { createContext } from 'react';

export const MobileLayoutContext = createContext({
  isPortrait: false,
  isLandscape: false,
});
