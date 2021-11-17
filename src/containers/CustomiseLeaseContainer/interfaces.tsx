import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
  GetVehicleDetails_vehicleDetails_roadsideAssistance,
  GetVehicleDetails_vehicleDetails_warrantyDetails,
} from '../../../generated/GetVehicleDetails';
import {
  GetQuoteDetails_quoteByCapId,
  GetQuoteDetails,
} from '../../../generated/GetQuoteDetails';
import { GetTrimAndColor } from '../../../generated/GetTrimAndColor';
import { Nullable } from '../../types/common';
import { IGetColourGroupList } from '../../types/detailsPage';
import { GetColourAndTrimGroupList_trimGroupList as TrimGroupList } from '../../../generated/GetColourAndTrimGroupList';

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
  leaseType: LeaseTypeEnum;
  isPlayingLeaseAnimation: boolean;
  isShowFreeInsuranceMerch?: boolean;
  isShowFreeHomeChargerMerch?: boolean;
  onCompletedCallBack: () => void;
  setIsPlayingLeaseAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaseType: React.Dispatch<React.SetStateAction<LeaseTypeEnum>>;
  setLeadTime: React.Dispatch<React.SetStateAction<string>>;
  onCompleted: (values: OrderInputObject) => void;
  setLeaseScannerData?: React.Dispatch<
    React.SetStateAction<ILeaseScannerData | null>
  >;
  quote?: GetQuoteDetails;
  trimData: (TrimGroupList | null)[] | null;
  colourData: IGetColourGroupList[] | null;
  colour: Nullable<number>;
  setColour: React.Dispatch<React.SetStateAction<number | null>>;
  mileage: number | null;
  setMileage: React.Dispatch<React.SetStateAction<number | null>>;
  pickups?: boolean;
  roadsideAssistance?: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?: GetVehicleDetails_vehicleDetails_warrantyDetails | null;
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
