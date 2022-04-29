import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import { factoryColorList, hotOfferColorList } from './mocks';
import ColorSelection from './ColorSelection';

storiesOf(`${atomicDir(base)}/ColorSelection`, module).add('Default', () => {
  return (
    <ColorSelection
      selectedColor={hotOfferColorList[0]}
      hotOfferColorList={hotOfferColorList}
      factoryColorList={factoryColorList}
      changeColour={() => {}}
    />
  );
});
