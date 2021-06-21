import React from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';
import ComparatorBar from './ComparatorBar';
import { atomicDir } from '../../../helpers/atomicDirUtils';

const vehicles = [
  {
    pageUrl: {
      url:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      href:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      capId: '1234',
    },
    bodyStyle: 'Hatchback',
    capId: '1234',
    manufacturerName: 'Ford',
    derivativeName: '1.0 ECOBOOST 125 ST-LINE NAV 5 DOORS',
    rangeName: 'Focus',
    modelName: 'Corsa Hatchback',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/164069/cap-90660-164069.jpg',
    leadTime: '14-21 Day Delivery',
    averageRating: 4.6,
    businessRate: 132.95,
    personalRate: 159.95,
    offerPosition: 2,
    isOnOffer: true,
    keyInformation: [],
    vehicleType: 'CAR',
  },
  {
    pageUrl: {
      url:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      href:
        'vauxhall-car-leasing/corsa/hatchback/1-2-turbo-sri-premium-5dr-164069.html',
      capId: '12345',
    },
    bodyStyle: 'Hatchback',
    isOnOffer: true,
    capId: '12345',
    manufacturerName: 'Ford',
    derivativeName: '2.5 ECOBOOST PHEV ST-LINE 5 DOORS CVT',
    rangeName: 'Kuga',
    modelName: 'Corsa Hatchback',
    imageUrl:
      'https://images.autorama.co.uk/Photos/Cap/Vehicles/164069/cap-90660-164069.jpg',
    leadTime: '14-21 Day Delivery',
    averageRating: 4.6,
    businessRate: 132.95,
    personalRate: 159.95,
    offerPosition: 2,
    keyInformation: [],
    vehicleType: 'CAR',
  },
];

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
