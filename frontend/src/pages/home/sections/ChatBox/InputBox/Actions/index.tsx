import React from 'react';
import BtnReGen from './BtnReGen';
import BtnAmend from './BtnAmend';
import RowStack from 'src/components/RowStack';
import BtnClearHistory from './BtnClearHistory';
import BtnRevert from './BtnRevert';
import Info from './Info';
import FlexFiller from '../../../miscs/FlexFiller';
import StyleSelector from './StyleSelector';

const Actions: React.FC = () => {
  return (
    <RowStack pt={0.5} pr={3} pl={2} spacing={0.5}>
      <BtnReGen />
      <BtnAmend />
      <BtnRevert />
      <BtnClearHistory />
      <StyleSelector />
      <FlexFiller />
      <Info />
    </RowStack>
  );
};

export default Actions;
