import { GetMyOrders_myOrders_lineItems_vehicleProduct as VehicleProduct } from '../../../generated/GetMyOrders';
import { GetDerivatives_derivatives as Derivatives } from '../../../generated/GetDerivatives';
import {
  LeaseTypeEnum,
  SortDirection,
  SortField,
} from '../../../generated/globalTypes';
import { defaultFormatDate } from '../../utils/dates';

/**
 * @param id - string, order ID
 * @param createdAt - string, order createdAt date
 * @param leaseType - string, order leaseType
 * @param state - string, order credit state
 * @param offer - VehicleProduct object, order
 * @param derivative - Derivatives, order derivative data for car
 * @param button - html element
 * @param quote - boolean, this order is quote
 */
export const createOffersObject = (
  createdAt: string,
  leaseType: string,
  state: string,
  offer: VehicleProduct,
  derivative?: Derivatives,
  button?: any,
  quote?: boolean,
) => ({
  price: offer.monthlyPayment || 0,
  priceDescription: `Per Month ${
    leaseType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
  }.VAT`,
  available: 'Now',
  initailRental: `£${offer.depositPayment} (${
    leaseType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
  } VAT)`,
  contractLength: `${offer.term} month`,
  annualMileage: offer.annualMileage?.toString() || '-',
  maintenance: offer.maintenance ? 'Yes' : 'No',
  fuel: derivative?.fuelType.name || '-',
  transmission: derivative?.transmission.name || '-',
  color: offer.colour || '-',
  trim: offer.trim || '-',
  orderNumber: undefined,
  orderDate: defaultFormatDate(new Date(createdAt)),
  orderButton: state === 'draft' || quote || !state ? button : undefined,
});

export const sortOrderValues = [
  {
    text: 'Newest To Oldest',
    value: `${SortField.availability}_${SortDirection.ASC}`,
  },
  {
    text: 'Oldest To Newest',
    value: `${SortField.availability}_${SortDirection.DESC}`,
  },
  {
    text: 'Price low to high',
    value: `${SortField.rate}_${SortDirection.DESC}`,
  },
  {
    text: 'Price high to low',
    value: `${SortField.rate}_${SortDirection.ASC}`,
  },
];

export const sortOrders = (first: any, second: any, type: SortField) => {
  if (type === SortField.availability) {
    return (
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
    );
  }
  return (
    second.lineItems[0].vehicleProduct.monthlyPayment -
    first.lineItems[0].vehicleProduct.monthlyPayment
  );
};
