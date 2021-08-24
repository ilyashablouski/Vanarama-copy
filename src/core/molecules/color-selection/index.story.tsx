import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import { IColor } from './interface';
import { factoryColorList, hotOfferColorList } from './mocks';
import ColorSelection from './ColorSelection';

storiesOf(`${atomicDir(base)}/ColorSelection`, module).add('Default', () => {
  const [selectedColor, setSelectedColor] = useState<IColor>(
    hotOfferColorList[0],
  );

  return (
    <ColorSelection
      selectedColor={selectedColor}
      hotOfferColorList={hotOfferColorList}
      factoryColorList={factoryColorList}
      onChange={setSelectedColor}
    />
  );
});
