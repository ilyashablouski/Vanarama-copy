import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import vehiclesMock from './__mocks__/ComparatorBar.mock';
import ComparatorBar from './ComparatorBar';
import { atomicDir } from '../../../helpers/atomicDirUtils';

storiesOf(`${atomicDir(base)}/ComparatorBar`, module).add('Default', () => (
  <div className="page:default">
    <ComparatorBar
      deleteVehicle={() => {}}
      compareVehicles={() => {}}
      vehicles={vehiclesMock}
      setCompareVehicles={() => {}}
    />
  </div>
));
