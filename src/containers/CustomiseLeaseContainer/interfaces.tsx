/* eslint-disable @typescript-eslint/camelcase */
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
  GetVehicleDetails_vehicleConfigurationByCapId_financeProfile,
} from '../../../generated/GetVehicleDetails';
import { GetQuoteDetails_quoteByCapId } from '../../../generated/GetQuoteDetails';

export interface ILeaseScannerData {
  maintenance: boolean | null;
  quoteByCapId: GetQuoteDetails_quoteByCapId | null | undefined;
  isDisabled: boolean;
  stateVAT: string;
  endAnimation: () => void;
  requestCallBack: () => void;
  onSubmit: () => void;
}

export interface IProps {
  capId: number;
  vehicleType: VehicleTypeEnum;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null | undefined;
  leaseType: string;
  financeProfile:
    | GetVehicleDetails_vehicleConfigurationByCapId_financeProfile
    | null
    | undefined;
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaseType: React.Dispatch<React.SetStateAction<string>>;
  setLeadTime: React.Dispatch<React.SetStateAction<string>>;
  onCompleted: (values: OrderInputObject) => Promise<void>;
  setLeaseScannerData?: React.Dispatch<
    React.SetStateAction<ILeaseScannerData | null>
  >;
}

export interface IQuoteDataInputs {
  capId: string;
  vehicleType: VehicleTypeEnum;
  mileage: number | null;
  term: number | null;
  upfront: number | null;
  leaseType: LeaseTypeEnum;
  trim: number | null;
  colour: number | null;
}
