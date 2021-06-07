import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import { vehicles } from 'core/organisms/comparator-bar/__tests__/IconList.spec';
import ComparatorBar from './ComparatorBar';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/ComparatorBar`, module).add('Default', () => (
  <div className="page:default">
    <ComparatorBar
      deleteVehicle={() => {}}
      compareVehicles={() => {}}
      vehicles={vehicles}
      setCompareVehicles={() => {}}
    />
  </div>
));
