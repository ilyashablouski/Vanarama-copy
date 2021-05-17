import { GetQuoteDetails_quoteByCapId } from '../../../generated/GetQuoteDetails';
import {
  GetVehicleDetails_derivativeInfo_colours,
  GetVehicleDetails_derivativeInfo_trims,
} from '../../../generated/GetVehicleDetails';

export interface IProps {
  quoteByCapId: GetQuoteDetails_quoteByCapId | null | undefined;
  stateVAT: string;
  maintenance: boolean | null;
  colours:
    | (GetVehicleDetails_derivativeInfo_colours | null)[]
    | null
    | undefined;
  trims: (GetVehicleDetails_derivativeInfo_trims | null)[] | null | undefined;
  trim: number | null | undefined;
  pickups?: boolean;
  isShowFreeInsuranceMerch?: boolean;
}
