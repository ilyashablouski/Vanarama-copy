import React from 'react';
import { vehicleComparator } from '../../generated/vehicleComparator';
import { IVehicle, IVehicleCarousel } from './comparatorHelpers';

export const PAGES_WITHOUT_COMPARATOR = [
  '/van-leasing/[...details-page]',
  '/car-leasing/[...details-page]',
  '/car-leasing-explained',
  '/van-leasing-explained',
  '/van-leasing/finance-options',
  '/car-leasing/finance-options',
  '/van-leasing-questions',
];

export const INIT_VEHICLE: vehicleComparator = {
  vehicleComparator: [
    {
      capId: null,
      vehicleType: null,
      data: [
        {
          name: 'List Price',
          value: '',
        },
        {
          name: 'WLTP Combined (g/km)',
          value: '',
        },
        {
          name: 'Fuel Type',
          value: '',
        },
        {
          name: 'Fuel Consumption (mpg)',
          value: '',
        },
        {
          name: '0-60 mph (secs)',
          value: '',
        },
        {
          name: 'Engine Size (cc)',
          value: '',
        },
        {
          name: 'Engine Power (BHP)',
          value: '',
        },
      ],
    },
  ],
};

interface IInitialState {
  compareVehicles: IVehicle[] | [] | undefined | null;
  compareChange: (
    product?: IVehicle | IVehicleCarousel | null,
    capId?: number | string,
  ) => Promise<void>;
}

const initialState = {
  compareVehicles: [],
  compareChange: () => {},
} as IInitialState;

export const CompareContext = React.createContext(initialState);
