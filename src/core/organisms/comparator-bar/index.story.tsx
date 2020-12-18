import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import ComparatorBar from './ComparatorBar';
import { atomicDir } from '../../../helpers/atomicDirUtils';

const vehicles = [
  {
    capId: '1234',
    derivativeName: '1.0 ECOBOOST 125 ST-LINE NAV 5 DOORS',
    manufacturerName: 'Ford',
    rangeName: 'Focus',
  },
  {
    capId: '12345',
    derivativeName: '2.5 ECOBOOST PHEV ST-LINE 5 DOORS CVT',
    manufacturerName: 'Ford',
    rangeName: 'Kuga',
  },
  {
    capId: '12345',
    derivativeName: '2.5 ECOBOOST PHEV ST-LINE 5 DOORS CVT',
    manufacturerName: 'Ford',
    rangeName: 'Kuga',
  },
];

storiesOf(`${atomicDir(base)}|ComparatorBar`, module).add('Default', () => (
  <div className="page:default">
    <ComparatorBar
      deleteVehicle={() => {}}
      compareVehicles={() => {}}
      vehicles={vehicles}
    />
  </div>
));
