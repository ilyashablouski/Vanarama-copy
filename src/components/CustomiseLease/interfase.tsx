/* eslint-disable @typescript-eslint/camelcase */
import { Dispatch, SetStateAction } from 'react';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
} from '../../../generated/GetVehicleDetails';

export interface IChoice {
  label: string;
  active: boolean;
}

export interface ITrim {
  id: string;
  optionDescription: string;
}

export interface IColour {
  id: string;
  optionDescription: string;
}

export interface IProps {
  terms: IChoice[];
  upfronts: IChoice[];
  leaseTypes: IChoice[];
  mileages: number[];
  setLeaseType: Dispatch<SetStateAction<string>>;
  setMileage: Dispatch<SetStateAction<number | null>>;
  setUpfront: Dispatch<SetStateAction<number | null>>;
  setColour: Dispatch<SetStateAction<number | null>>;
  setTerm: Dispatch<SetStateAction<number | null>>;
  setTrim: Dispatch<SetStateAction<number | null>>;
  setMaintenance: Dispatch<SetStateAction<boolean | null>>;
  data: GetQuoteDetails;
  leaseType: string;
  loading: boolean;
  trim: number | null;
  colour: number | null;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null | undefined;
  mileage: number | null | undefined;
  maintenance: boolean | null;
  setIsModalShowing: Dispatch<SetStateAction<boolean>>;
  isModalShowing: boolean;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
