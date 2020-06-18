/* eslint-disable @typescript-eslint/camelcase */
import moment from 'moment';

import { GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct } from '../../../generated/GetOrdersByPartyUuid';
import { GetDerivatives_derivatives } from '../../../generated/GetDerivatives';
import { LeaseTypeEnum } from '../../../generated/globalTypes';

/**
 * @param id - string, order ID
 * @param createdAt - string, order createdAt date
 * @param leasType - string, order leasType
 * @param state - string, order credit state
 * @param offer - GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct object, order
 * @param derivative - GetDerivatives_derivatives, order derivative data for car
 * @param button - html element
 * @param quote - boolean, this order is quote
 */
export const createOffersObject = (
  id: string,
  createdAt: string,
  leasType: string,
  state: string,
  offer: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct,
  derivative?: GetDerivatives_derivatives,
  button?: any,
  quote?: boolean,
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
  annualMileage: offer.annualMileage?.toString() || '-',
  maintenance: offer.maintenance ? 'Yes' : 'No',
  fuel: derivative?.fuelTypeName || '-',
  transmission: derivative?.transmissionName || '-',
  color: offer.colour || '-',
  trim: offer.trim || '-',
  orderNumber: state !== 'draft' ? id : undefined,
  orderDate: moment(createdAt).format('DD.MM.YYYY'),
  orderButton: state === 'draft' || quote || !state ? button : undefined,
});

export default createOffersObject;
