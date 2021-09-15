import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import { factoryColorList, hotOfferColorList } from './mocks';
import ColorSelection from './ColorSelection';

storiesOf(`${atomicDir(base)}/ColorSelection`, module).add('Default', () => {
  const [selectedColor, setSelectedColor] = useState(
    hotOfferColorList[0]?.capId,
  );

  return (
    <ColorSelection
      selectedColorId={selectedColor}
      hotOfferColorList={hotOfferColorList}
      factoryColorList={factoryColorList}
      onChange={setSelectedColor}
    />
  );
});
