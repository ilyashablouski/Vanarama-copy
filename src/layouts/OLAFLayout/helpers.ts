/* eslint-disable @typescript-eslint/camelcase */
import { GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct } from '../../../generated/GetOrdersByPartyUuid';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { LeaseTypeEnum } from '../../../generated/globalTypes';

export const createOlafDetails = (
  leasType: string,
  offer: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct,
  derivative: GetDerivatives_derivatives,
) => ({
  price: offer.monthlyPayment || 0,
  priceDescription: `Per Month ${
    leasType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
  }.VAT`,
  available: 'Now',
  initailRental: `£${offer.depositPayment} (${
    leasType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
  } VAT)`,
  contractLength: `${offer.depositMonths} month`,
  annualMileage: offer.annualMileage ? `${offer.annualMileage} miles` : '-',
  maintenance: offer.maintenance ? 'Yes' : 'No',
  fuel: derivative?.fuelTypeName || '-',
  transmission: derivative?.transmissionName || '-',
  color: offer.colour || '-',
  trim: offer.trim || '-',
  description: `${(offer.depositMonths || 1) - 1} month contact (${
    leasType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
  } VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.`,
  annualMileageBooster: 'Extra 600 miles FREE',
  damageCover: 'Included',
});

export default createOlafDetails;
