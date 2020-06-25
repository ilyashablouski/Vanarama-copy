/* eslint-disable @typescript-eslint/camelcase */
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
} from '../../../generated/GetVehicleDetails';

export interface IProps {
  capId: number;
  vehicleType: VehicleTypeEnum;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null | undefined;
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
