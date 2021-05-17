import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  OrderInputObject,
} from '../../../generated/globalTypes';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
} from '../../../generated/GetVehicleDetails';
import {
  GetQuoteDetails_quoteByCapId,
  GetQuoteDetails,
} from '../../../generated/GetQuoteDetails';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';

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
  isDisabled: boolean;
  isShowFreeInsuranceMerch?: boolean;
  onCompletedCallBack: () => void;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaseType: React.Dispatch<React.SetStateAction<string>>;
  setLeadTime: React.Dispatch<React.SetStateAction<string>>;
  onCompleted: (values: OrderInputObject) => void;
  setLeaseScannerData?: React.Dispatch<
    React.SetStateAction<ILeaseScannerData | null>
  >;
  quote?: GetQuoteDetails;
  trimData: ITrimList[];
  colourData: IColourList[];
  mileage: number | null;
  setMileage: React.Dispatch<React.SetStateAction<number | null>>;
  pickups?: boolean;
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
