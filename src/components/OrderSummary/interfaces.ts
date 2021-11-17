import { GetQuoteDetails_quoteByCapId } from '../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails_vehicleDetails_roadsideAssistance,
  GetVehicleDetails_vehicleDetails_warrantyDetails,
} from '../../../generated/GetVehicleDetails';
import { Nullable } from '../../types/common';
import { IGetColourGroupList } from '../../types/detailsPage';
import { GetColourAndTrimGroupList_trimGroupList as TrimGroupList } from '../../../generated/GetColourAndTrimGroupList';

export interface IProps {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null | undefined;
  stateVAT: string;
  maintenance: boolean | null;
  colours: Nullable<IGetColourGroupList[]>;
  trims: Nullable<(TrimGroupList | null)[]>;
  trim?: number | null;
  pickups?: boolean;
  isShowFreeInsuranceMerch?: boolean;
  isShowFreeHomeChargerMerch?: boolean;
  roadsideAssistance?: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?: GetVehicleDetails_vehicleDetails_warrantyDetails | null;
}
