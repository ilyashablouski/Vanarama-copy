import React from 'react';
import { IVehicle, IVehicleCarousel } from './comparatorHelpers';

export const PAGES_WITH_COMPARATOR = ['eligibility-checker/results', 'hub/'];

export const WHOLE_PATHS_PAGES_WITH_COMPARATOR = [
  '/car-leasing',
  '/van-leasing',
  '/',
];

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
