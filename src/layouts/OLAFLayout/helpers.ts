import { createContext } from 'react';
import { DEFAULT_FUNDER, DEFAULT_TERM } from '../../models/enum/OlafVariables';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import { GetDerivatives_derivatives as Derivatives } from '../../../generated/GetDerivatives';
import {
  LeaseTypeEnum,
  OrderInputObject,
  VehicleProductInputObject,
} from '../../../generated/globalTypes';
import { GetLeaseCompanyData as ILeaseData } from '../../../generated/GetLeaseCompanyData';
import { Nullable, Nullish } from '../../types/common';

export const formatPrice = (price?: number | null) =>
  parseFloat((price || 0).toFixed(2));

/**
 * @param leaseType - string, offer leaseType
 * @param offer - offer
 * @param derivative - derivative data for offer car
 */
export const createOlafDetails = (
  leaseType: string,
  offer: VehicleProductInputObject,
  derivative: Derivatives,
) => ({
  isFreeInsurance: offer.freeInsurance?.optIn || null,
  price:
    offer.maintenance && offer.maintenancePrice && offer.monthlyPayment
      ? formatPrice(offer.monthlyPayment + offer.maintenancePrice)
      : formatPrice(offer.monthlyPayment),
  priceDescription: `Per Month ${
    leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
  }.VAT`,
  available: 'Now',
  initailRental: offer.depositPayment
    ? `£${
        offer.maintenance && offer.maintenancePrice
          ? formatPrice(offer.maintenancePrice + offer.depositPayment)
          : formatPrice(offer.depositPayment)
      } (${leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'} VAT)`
    : '-',
  contractLength: offer.term ? `${offer.term} month` : '-',
  annualMileage: offer.annualMileage ? `${offer.annualMileage} miles` : '-',
  maintenance: offer.maintenance ? 'Yes' : 'No',
  fuel: derivative?.fuelType.name || '-',
  transmission: derivative?.transmission.name || '-',
  color: offer.colour || '-',
  trim: offer.trim || '-',
  description: `${(offer.term || 1) - 1} monthly payments (${
    leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
  } VAT). Paid by direct debit. Initial Rental is taken around 10 days after delivery and each month on the same date thereafter for the length of the contract.`,
  initialRentalDataTestId: 'about_intial-rental-testID',
  controlLengthDataTestId: 'about_control-length-testID',
  annualMileageDataTestId: 'about_annual-mileage-testID',
  annualMileageBoosterDataTestId: 'about_annual-milage-booster-testID',
  damageCoverDataTestId: 'about_damage-cover-testID',
  maintenanceDataTestId: 'about_maintenance-testID',
  fuelDataTestId: 'about_fuel-testID',
  transmissionDataTestId: 'about_transmission-testID',
  colorDataTestId: 'about_color-testID',
  trimDataTestId: 'about_trim-testID',
  descriptionDataTestId: 'about_description-testID',
});

// get funder term for address/employement history
export const getFunderTerm = (
  data: Nullish<ILeaseData>,
  order: Nullable<OrderInputObject>,
) => {
  if (data?.creditApplicationByOrderUuid?.lineItem) {
    const vehicleProduct =
      data?.creditApplicationByOrderUuid?.lineItem?.vehicleProduct;
    const aboutDetails = data?.creditApplicationByOrderUuid?.aboutDetailsV2;
    if (order?.leaseType === LeaseTypeEnum.PERSONAL) {
      return vehicleProduct?.funderData?.b2c.address_history || DEFAULT_TERM;
    }
    switch (aboutDetails?.companyType) {
      case CompanyTypes.limited:
        return vehicleProduct?.funderData?.b2b.limited.address_history;
      case CompanyTypes.partnership:
        return vehicleProduct?.funderData?.b2b.partnership.address_history;
      case CompanyTypes.soleTrader:
        return vehicleProduct?.funderData?.b2b.sole_trader.address_history;
      default:
        return DEFAULT_TERM;
    }
  } else {
    return DEFAULT_TERM;
  }
};

export const getFunderName = (data: Nullish<ILeaseData>) =>
  data?.creditApplicationByOrderUuid?.lineItem?.vehicleProduct?.funderData
    ?.funder_name;

export const OlafContext = createContext({
  requiredMonths: DEFAULT_TERM,
  funderName: DEFAULT_FUNDER,
  leaseDataLoading: false,
});
OlafContext.displayName = 'OlafContext';

export const olafTitleMapper: { [index: string]: string } = {
  about: 'OLAF - About you | Vanarama',
  'company-details': 'OLAF - Company Details | Vanarama',
  'vat-details': 'OLAF - VAT Details | Vanarama',
  'director-details': 'OLAF - Director Details | Vanarama',
  'company-bank-details': 'OLAF - Company Bank Details | Vanarama',
  summary: 'OLAF - Summary | Vanarama',
  'sole-trader-details': 'OLAF - Sole Trader Details | Vanarama',
  'thank-you': 'OLAF - Thank You | Vanarama',
  expenses: 'OLAF - Expenses | Vanarama',
  'employment-history': 'OLAF - Employment History | Vanarama',
  'bank-details': 'OLAF - Bank Details | Vanarama',
  'address-history': 'OLAF - Address History | Vanarama',
  'sole-trader': 'OLAF - Sole Trader | Vanarama',
};
