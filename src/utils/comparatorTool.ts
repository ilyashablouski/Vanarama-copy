import React from 'react';
import { IVehicle } from './helpers';

export const PAGES_WITH_COMPARATOR = [
  'eligibility-checker/results',
  'car-leasing',
  'hub/',
  'van-leasing',
];

interface IInitialState {
  compareVehicles: IVehicle[] | [] | undefined;
  setCompareVehicles: (vehicles?: IVehicle[] | [] | undefined) => void;
  setModalCompareTypeError: (show?: boolean | undefined) => void;
}

const initialState = {
  compareVehicles: [],
  setCompareVehicles: () => {},
  setModalCompareTypeError: () => {},
} as IInitialState;

export const CompareContext = React.createContext(initialState);
