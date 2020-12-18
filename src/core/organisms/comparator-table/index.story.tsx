import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import ComparatorTable from './ComparatorTable';
import { atomicDir } from '../../../helpers/atomicDirUtils';

const criterias = [
  {
    title: 'Manufacturer OTR',
    values: ['1', '2', '3'],
  },
  {
    title: 'WLTP Combined',
    values: ['1', '2', '3'],
  },
  {
    title: 'Fuel Type',
    values: ['1', '2', '3'],
  },
  {
    title: '0 to 60 mph (secs)',
    values: ['1', '2', '3'],
  },
  {
    title: 'CC',
    values: ['1', '2', '3'],
  },
  {
    title: 'Engine Power - BHP',
    values: ['2', '2', '3'],
  },
  {
    title: 'Insurance Group',
    values: ['1', '2', '3'],
  },
  {
    title: 'No. of Seats',
    values: ['1', '2', '3'],
  },
  {
    title: 'Top Speed',
    values: ['1', '2', '3'],
  },
  {
    title: 'Transmission',
    values: ['1', '2', '3'],
  },
  {
    title: 'Price',
    values: [
      {
        capId: 1,
        price: 51.73,
      },
      {
        capId: 2,
        price: 52.44,
      },
      {
        capId: 3,
        price: 53.44,
      },
    ],
  },
  {
    title: 'Heading',
    values: [
      {
        capId: 1,
        name: 'Peugeot 201',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
      {
        capId: 2,
        name: 'Peugeot 203',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
      {
        capId: 3,
        name: 'Peugeot 306',
        description: '1.6 GDi SE Nav 5DR 2WD',
        image:
          'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg',
      },
    ],
  },
];

storiesOf(`${atomicDir(base)}|ComparatorTable`, module).add('Default', () => (
  <div className="page:default">
    <div className="row:comparator-tool">
      <ComparatorTable
        addVehicle={() => {}}
        deleteVehicle={() => {}}
        criterias={criterias}
        viewOffer={() => {}}
      />
    </div>
  </div>
));
