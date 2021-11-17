import {
  VehicleTypeEnum,
  LineItemInputObject,
} from '../../generated/globalTypes';
import { GetQuoteDetails } from '../../generated/GetQuoteDetails';
import { Nullable, Nullish } from '../types/common';
import { getPartnerSlug } from './partnerProperties';
import { IGetColourGroupList } from '../types/detailsPage';
import { GetColourAndTrimGroupList_trimGroupList as TrimGroupList } from '../../generated/GetColourAndTrimGroupList';

interface ILineItemParams {
  capId: number;
  quoteData: Nullish<GetQuoteDetails>;
  colourList: Nullable<Nullable<IGetColourGroupList>[]>;
  trimList: Nullable<Nullable<TrimGroupList>[]>;
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
  let colourDescription;
  let trimDescription;

  colourList?.forEach(colourGroup =>
    colourGroup?.colors?.forEach(colour => {
      if (colour.optionId?.toString() === quoteData?.quoteByCapId?.colour) {
        colourDescription = colour.label;
      }
    }),
  );

  trimList?.forEach(trimGroup =>
    trimGroup?.trims?.forEach(trim => {
      if (
        trim?.optionId?.toString() === quoteData?.quoteByCapId?.trim ||
        trim?.optionId === trimValue
      ) {
        trimDescription = trim?.label;
      }
    }),
  );

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
