import { GetQuoteDetails_quoteByCapId } from '../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails_vehicleDetails_roadsideAssistance,
  GetVehicleDetails_vehicleDetails_warrantyDetails,
} from '../../../generated/GetVehicleDetails';
import {
  GetTrimAndColor_colourList as IColourList,
  GetTrimAndColor_trimList as ITrimList,
} from '../../../generated/GetTrimAndColor';

export interface IProps {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null | undefined;
  stateVAT: string;
  maintenance: boolean | null;
  colours: (IColourList | null)[] | null;
  trims: (ITrimList | null)[] | null;
  trim: number | null | undefined;
  pickups?: boolean;
  isShowFreeInsuranceMerch?: boolean;
  roadsideAssistance?: GetVehicleDetails_vehicleDetails_roadsideAssistance | null;
  warrantyDetails?: GetVehicleDetails_vehicleDetails_warrantyDetails | null;
}
