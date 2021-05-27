import {
  GetMyOrders_myOrders,
  GetMyOrders_myOrders_lineItems as GetMyOrdersLineItem,
  GetMyOrders_myOrders_lineItems_creditApplications as GetMyOrdersCreditApplication,
  GetMyOrders_myOrders_lineItems_vehicleProduct as GetMyOrdersVehicleProduct,
  GetMyOrders_myOrders_lineItems_vehicleProduct as VehicleProduct,
} from '../../../generated/GetMyOrders';
import { GetDerivatives_derivatives as Derivatives } from '../../../generated/GetDerivatives';
import {
  CreditApplicationTypeEnum,
  LeaseTypeEnum,
  LineItemInputObject,
  OrderInputObject,
  SortDirection,
  SortField,
  VehicleProductInputObject,
} from '../../../generated/globalTypes';
import { defaultFormatDate } from '../../utils/dates';
import generateSoleTraderSteps from '../../components/BusinessProgressIndicator/generateSoleTraderSteps';
import generateLimitedSteps from '../../components/BusinessProgressIndicator/generateLimitedSteps';
import generateConsumerSteps from '../../components/ConsumerProgressIndicator/generateConsumerSteps';

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

export const createVehicleProductInput = (
  vehicleProduct: GetMyOrdersVehicleProduct | null,
): VehicleProductInputObject => ({
  annualMileage: vehicleProduct?.annualMileage,
  colour: vehicleProduct?.colour,
  depositMonths: vehicleProduct?.depositMonths,
  depositPayment: vehicleProduct?.depositPayment,
  derivativeCapId: vehicleProduct!.derivativeCapId,
  description: vehicleProduct?.description,
  finalPayment: vehicleProduct?.finalPayment,
  financeType: vehicleProduct?.financeType,
  funderId: vehicleProduct?.funderId,
  leadTime: vehicleProduct?.leadTime,
  maintenance: vehicleProduct?.maintenance,
  maintenancePrice: vehicleProduct?.maintenancePrice,
  monthlyPayment: vehicleProduct?.monthlyPayment,
  term: vehicleProduct?.term,
  trim: vehicleProduct?.trim,
  vehicleType: vehicleProduct!.vehicleType,
  vsku: vehicleProduct?.vsku,
});

export const createLineItemsInputFromMyOrder = (
  myOrdersLineItems: GetMyOrdersLineItem[],
): LineItemInputObject[] =>
  myOrdersLineItems.map(item => ({
    leadManagerQuoteId: item.leadManagerQuoteId,
    orderId: item.order?.uuid,
    quantity: item.quantity,
    vehicleProduct: createVehicleProductInput(item.vehicleProduct),
  }));

export const createOrderInputFromMyOrder = (
  myOrder: GetMyOrders_myOrders,
): OrderInputObject => ({
  leaseType: myOrder.leaseType,
  lineItems: createLineItemsInputFromMyOrder(myOrder.lineItems),
  partyUuid: myOrder.partyUuid,
  personUuid: myOrder.personUuid,
  referenceNumber: myOrder.referenceNumber,
  salesChannel: myOrder.salesChannel,
  uuid: myOrder.uuid,
});

const isEmptyObject = (object?: Object | null) =>
  Object.values(object || {}).length === 0;

export const mapCreditApplicationToProgressbarSteps = (
  creditApplication?: GetMyOrdersCreditApplication | null,
) => {
  switch (creditApplication?.creditApplicationType) {
    case CreditApplicationTypeEnum.B2B_LIMITED:
    case CreditApplicationTypeEnum.B2B_PARTNERSHIP:
    case CreditApplicationTypeEnum.B2B_REGISTERED_PARTNERSHIP:
      return generateLimitedSteps();
    case CreditApplicationTypeEnum.B2B_SOLE_TRADER:
      return generateSoleTraderSteps();
    case CreditApplicationTypeEnum.B2C_PERSONAL:
      return generateConsumerSteps();
    default:
      return [];
  }
};

export const findLastFinishedStep = (
  creditApplication?: GetMyOrdersCreditApplication | null,
) => {
  const tabBarSteps = mapCreditApplicationToProgressbarSteps(creditApplication);
  const lastStep = tabBarSteps.find(step =>
    isEmptyObject(
      creditApplication?.[step.dataPath as keyof GetMyOrdersCreditApplication],
    ),
  );

  // if is not possible to find empty step -> all steps finished -> go summary
  return lastStep || tabBarSteps[tabBarSteps.length - 1];
};
