import React from 'react';
import { IVehicle, IVehicleCarousel } from './comparatorHelpers';

export const PAGES_WITH_COMPARATOR = [
  'eligibility-checker/results',
  'car-leasing',
  'hub/',
  'van-leasing',
];

interface IInitialState {
  compareVehicles: IVehicle[] | [] | undefined | null;
  compareChange: (
    product?: IVehicle | IVehicleCarousel | null,
  ) => Promise<void>;
}

const initialState = {
  compareVehicles: [],
  compareChange: () => {},
} as IInitialState;

export const CompareContext = React.createContext(initialState);
