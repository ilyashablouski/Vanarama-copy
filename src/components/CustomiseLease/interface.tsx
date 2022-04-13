import { Dispatch, SetStateAction } from 'react';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_leaseAdjustParams,
  GetVehicleDetails_vehicleDetails_roadsideAssistance,
  GetVehicleDetails_vehicleDetails_warrantyDetails,
} from '../../../generated/GetVehicleDetails';
import {
  OrderInputObject,
  LineItemInputObject,
  LeaseTypeEnum,
} from '../../../generated/globalTypes';
import { Nullable, Nullish } from '../../types/common';
import { IOptionsList } from '../../types/detailsPage';

export interface IChoice {
  label: string;
  value?: string;
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
  term: Nullable<number>;
  terms: string[];
  upfront: Nullable<number>;
  upfronts: string[];
  defaultUpfrontValue: number | null;
  defaultTermValue: number | null;
  defaultMileageValue: number | null;
  leaseTypes: string[];
  mileages: number[];
  setLeaseType: Dispatch<SetStateAction<LeaseTypeEnum>>;
  setMileage: Dispatch<SetStateAction<number | null>>;
  setUpfront: Dispatch<SetStateAction<number | null>>;
  setColour: Dispatch<SetStateAction<number | null>>;
  setTerm: Dispatch<SetStateAction<number | null>>;
  setTrim: Dispatch<SetStateAction<number | null>>;
  setMaintenance: Dispatch<SetStateAction<boolean | null>>;
  data: GetQuoteDetails;
  capId?: number;
  leaseType: string;
  trim: Nullable<string>;
  colour: Nullable<string>;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  leaseAdjustParams: GetVehicleDetails_leaseAdjustParams | null | undefined;
  mileage: number | null | undefined;
  maintenance: boolean | null;
  setIsModalShowing: Dispatch<SetStateAction<boolean>>;
  isModalShowing: boolean;
  isInitPayModalShowing: boolean;
  setIsInitPayModalShowing: Dispatch<SetStateAction<boolean>>;
  isPlayingLeaseAnimation: boolean;
  isShowFreeInsuranceMerch?: boolean;
  isShowFreeHomeChargerMerch?: boolean;
  setIsInitialLoading: Dispatch<SetStateAction<boolean>>;
  setIsPlayingLeaseAnimation: Dispatch<SetStateAction<boolean>>;
  setIsRestoreLeaseSettings: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: OrderInputObject) => void;
  lineItem: LineItemInputObject;
  showCallBackForm: Dispatch<SetStateAction<boolean>>;
  isStartScreen: boolean;
  trimData: Nullable<IOptionsList[]>;
  colourData: Nullable<IOptionsList[]>;
  pickups?: boolean;
  roadsideAssistance?: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?: GetVehicleDetails_vehicleDetails_warrantyDetails | null;
  setIsHotOffer?: Dispatch<SetStateAction<Nullish<boolean>>>;
  setIsFactoryOrder?: Dispatch<SetStateAction<boolean | undefined>>;
  toggleColorAndTrimModalVisible: () => void;
  isColourAndTrimOverlay: boolean;
}
