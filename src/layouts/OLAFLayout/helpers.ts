/* eslint-disable @typescript-eslint/camelcase */
import { GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct } from '../../../generated/GetOrdersByPartyUuid';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { LeaseTypeEnum } from '../../../generated/globalTypes';

/**
 * @param leaseType - string, offer leaseType
 * @param offer - offer
 * @param derivative - derivative data for offer car
 */
export const createOlafDetails = (
  leaseType: string,
  offer: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct,
  derivative: GetDerivatives_derivatives,
) => ({
  price: offer.monthlyPayment || 0,
  priceDescription: `Per Month ${
    leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
  }.VAT`,
  available: 'Now',
  initailRental: offer.depositPayment
    ? `£${offer.depositPayment} (${
        leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
      } VAT)`
    : '-',
  contractLength: offer.depositMonths ? `${offer.depositMonths} month` : '-',
  annualMileage: offer.annualMileage ? `${offer.annualMileage} miles` : '-',
  maintenance: offer.maintenance ? 'Yes' : 'No',
  fuel: derivative?.fuelTypeName || '-',
  transmission: derivative?.transmissionName || '-',
  color: offer.colour || '-',
  trim: offer.trim || '-',
  description: `${(offer.depositMonths || 1) - 1} month contact (${
    leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
  } VAT). Paid by Direct Debit. First due ≈ 10 days after delivery.`,
  annualMileageBooster: 'Extra 600 miles FREE',
  damageCover: 'Included',
});

export default createOlafDetails;
