import {
  VehicleTypeEnum,
  LineItemInputObject,
} from '../../generated/globalTypes';
import { GetQuoteDetails } from '../../generated/GetQuoteDetails';
import { Nullable, Nullish } from '../types/common';
import { getPartnerSlug } from './partnerProperties';
import { IOptionsList } from '../types/detailsPage';
import { getOptionFromList } from './helpers';

interface ILineItemParams {
  capId: number;
  quoteData: Nullish<GetQuoteDetails>;
  colourData: Nullable<IOptionsList[]>;
  trimData: Nullable<IOptionsList[]>;
  vehicleTypeValue: VehicleTypeEnum;
  maintenanceValue: Nullish<boolean>;
  trimValue: Nullable<number>;
  termValue: Nullable<number>;
  mileageValue: Nullable<number>;
  upfrontValue: Nullable<number>;
}

const getLineItem = ({
  capId,
  quoteData,
  colourData,
  trimData,
  vehicleTypeValue,
  maintenanceValue,
  termValue,
  trimValue,
  mileageValue,
  upfrontValue,
}: ILineItemParams): LineItemInputObject => {
  const colourDescription = getOptionFromList(
    colourData,
    quoteData?.quoteByCapId?.colour,
  )?.label;

  const trimDescription =
    getOptionFromList(trimData, quoteData?.quoteByCapId?.trim)?.label ||
    getOptionFromList(trimData, String(trimValue))?.label;

  const partnerSlug = getPartnerSlug();

  return {
    quantity: 1,
    vehicleProduct: {
      vehicleType: vehicleTypeValue,
      derivativeCapId: capId.toString(),
      colour: colourDescription,
      trim: trimDescription,
      stockBatchId: quoteData?.quoteByCapId?.stockBatchId,
      leadTime: quoteData?.quoteByCapId?.leadTime,
      term: quoteData?.quoteByCapId?.term || termValue || null,
      funderId: quoteData?.quoteByCapId?.funderId?.toString() || null,
      annualMileage: quoteData?.quoteByCapId?.mileage || mileageValue,
      depositMonths: quoteData?.quoteByCapId?.upfront || upfrontValue || null,
      depositPayment: quoteData?.quoteByCapId?.leaseCost?.initialRental || null,
      monthlyPayment: quoteData?.quoteByCapId?.leaseCost?.monthlyRental || null,
      maintenance: maintenanceValue,
      maintenancePrice: maintenanceValue
        ? quoteData?.quoteByCapId?.maintenanceCost?.monthlyRental
        : undefined,
      partnerSlug,
    },
  };
};

export default getLineItem;
