import {
  VehicleTypeEnum,
  LineItemInputObject,
} from '../../generated/globalTypes';
import {
  GetTrimAndColor_trimList as ITrimList,
  GetTrimAndColor_colourList as IColourList,
} from '../../generated/GetTrimAndColor';
import { GetQuoteDetails } from '../../generated/GetQuoteDetails';
import { Nullable, Nullish } from '../types/common';
import { getPartnerSlug } from './partnerProperties';

interface ILineItemParams {
  capId: number;
  quoteData: Nullish<GetQuoteDetails>;
  colourList: Nullable<Nullable<IColourList>[]>;
  trimList: Nullable<Nullable<ITrimList>[]>;
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
  colourList,
  trimList,
  vehicleTypeValue,
  maintenanceValue,
  termValue,
  trimValue,
  mileageValue,
  upfrontValue,
}: ILineItemParams): LineItemInputObject => {
  const colourDescription = colourList?.find(
    item => item?.optionId?.toString() === quoteData?.quoteByCapId?.colour,
  )?.label;
  const trimDescription = trimList?.find(
    item =>
      item?.optionId?.toString() === quoteData?.quoteByCapId?.trim ||
      item?.optionId === trimValue,
  )?.label;

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
