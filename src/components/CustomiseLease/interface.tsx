/* eslint-disable @typescript-eslint/camelcase */
import { Dispatch, SetStateAction } from 'react';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
} from '../../../generated/GetVehicleDetails';
import {
  OrderInputObject,
  LineItemInputObject,
} from '../../../generated/globalTypes';
import { LeaseType } from '../../containers/CustomiseLeaseContainer/interfaces';

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
  setLeaseType: Dispatch<SetStateAction<LeaseType>>;
  setMileage: Dispatch<SetStateAction<number | null>>;
  setUpfront: Dispatch<SetStateAction<number | null>>;
  setColour: Dispatch<SetStateAction<number | null>>;
  setTerm: Dispatch<SetStateAction<number | null>>;
  setTrim: Dispatch<SetStateAction<number | null>>;
  setMaintenance: Dispatch<SetStateAction<boolean | null>>;
  data: GetQuoteDetails;
  leaseType: LeaseType;
  trim: number | null;
  colour: number | null;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null | undefined;
  mileage: number | null | undefined;
  maintenance: boolean | null;
  setIsModalShowing: Dispatch<SetStateAction<boolean>>;
  isModalShowing: boolean;
  isDisabled: boolean;
  setIsInitialLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: OrderInputObject) => Promise<any>;
  lineItem: LineItemInputObject;
  showCallBackForm: Dispatch<SetStateAction<boolean>>;
  screenY: number | null;
}
