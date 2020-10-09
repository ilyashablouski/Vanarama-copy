/* eslint-disable @typescript-eslint/camelcase */
import localForage from 'localforage';
import { sha256 } from 'js-sha256';
import { ILeaseScannerData } from '../containers/CustomiseLeaseContainer/interfaces';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_vehicleConfigurationByCapId,
} from '../../generated/GetVehicleDetails';
import { OrderInputObject, LeaseTypeEnum } from '../../generated/globalTypes';
import { PersonByToken } from '../../generated/PersonByToken';
import {
  GetOlafData_orderByUuid,
  GetOlafData_orderByUuid_lineItems,
} from '../../generated/GetOlafData';
import { GetDerivative_derivative } from '../../generated/GetDerivative';

interface ICheckoutData {
  price: string | number | null | undefined;
  product?: IProduct;
  detailsData: GetOlafData_orderByUuid | null;
  derivativeData: GetDerivative_derivative | null;
  lineItem: GetOlafData_orderByUuid_lineItems | undefined;
  type?: string;
}

interface IPDPData {
  capId: string | number | undefined;
  derivativeInfo:
    | GetVehicleDetails_derivativeInfo
    | GetDerivative_derivative
    | null
    | undefined;
  vehicleConfigurationByCapId?:
    | GetVehicleDetails_vehicleConfigurationByCapId
    | null
    | undefined;
  leaseScannerData?: ILeaseScannerData | null;
  price: string | number | null | undefined;
  values?: OrderInputObject;
  product?: IProduct;
  category?: string;
}

interface ISummary {
  detailsData: GetOlafData_orderByUuid | null;
  derivativeData: GetDerivative_derivative | null;
  orderId: string;
  emailAddress: string | undefined;
  type?: string;
}

interface IProduct {
  [key: string]: string;
}

interface IDetail {
  products: IProduct[];
}

interface IEcommerceData {
  currencyCode: string;
  detail?: IDetail;
  add?: IDetail;
}

interface IPageDataLayer {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string | undefined;
  eventValue: string | undefined;
  ecommerce?: IEcommerceData;
  annualMileage?: string;
  id?: string;
  name?: string;
  price?: string;
  variant?: string;
  category?: string;
  brand?: string;
  vehicleModel?: string;
}

interface ICategory {
  cars: boolean | null | undefined;
  vans: boolean | null | undefined;
  pickups: boolean | null | undefined;
}

declare global {
  interface Window {
    dataLayer: object[];
  }
}

const PRICE_TYPE = {
  excVAT: 'Excluding VAT',
  incVAT: 'Including VAT',
};

export const getCategory = ({ cars, pickups }: ICategory): string => {
  if (pickups) return 'Pickup';
  if (cars) return 'Car';
  return 'Van';
};

const getCategoryAboutYouData = (
  derivativeData: GetDerivative_derivative | null,
) => {
  if (derivativeData?.bodyType?.name?.includes('Pick-Up')) {
    return 'Pickup';
  }

  return 'Van';
};

export const pushToDataLayer = (data: IPageDataLayer) => {
  window.dataLayer?.push(data);
};

export const pushDetail = (
  field: string,
  value: string | number | null | undefined,
  product?: IProduct,
) => {
  if (value) Object.assign(product, { [field]: `${value}` });
};

export const pushPageData = async (
  pageType: string,
  siteSection: string,
  email?: boolean,
) => {
  if (!window.dataLayer) return;
  const personData = (await localForage.getItem(
    'person',
  )) as PersonByToken | null;
  const person = personData?.personByToken;

  const data = {
    pageType,
    siteSection,
  };

  pushDetail('customerId', person?.uuid, data);
  pushDetail(
    'visitorEmail',
    email && person?.emailAddresses && person?.emailAddresses[0]?.value
      ? sha256(person?.emailAddresses[0].value)
      : null,
    data,
  );
  window.dataLayer.push(data);
};

const getProductData = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
  product,
  category,
}: IPDPData) => {
  const variant = vehicleConfigurationByCapId?.capRangeDescription;
  const vehicleModel = vehicleConfigurationByCapId?.capModelDescription;

  pushDetail('id', capId, product);
  pushDetail('name', derivativeInfo?.name, product);
  pushDetail('price', price, product);
  pushDetail('category', category, product);
  pushDetail(
    'brand',
    vehicleConfigurationByCapId?.capManufacturerDescription,
    product,
  );
  pushDetail('variant', variant, product);
  pushDetail(
    'vehicleModel',
    vehicleModel !== variant ? vehicleModel : null,
    product,
  );
};

const getProductDataForCheckout = ({
  product,
  detailsData,
  derivativeData,
  price,
  type,
  lineItem,
}: ICheckoutData) => {
  getProductData({
    capId: derivativeData?.id,
    derivativeInfo: derivativeData,
    price,
    category: type || getCategoryAboutYouData(derivativeData),
    product,
  });

  pushDetail('brand', derivativeData?.manufacturer.name, product);
  pushDetail('variant', derivativeData?.range.name, product);
  pushDetail('quantity', lineItem?.quantity, product);
  pushDetail(
    'vehicleModel',
    derivativeData?.model.name !== derivativeData?.range.name
      ? derivativeData?.model.name
      : null,
    product,
  );
  pushDetail('annualMileage', lineItem?.vehicleProduct?.annualMileage, product);
  pushDetail('journeyType', detailsData?.leaseType, product);
  pushDetail(
    'priceType',
    detailsData?.leaseType === LeaseTypeEnum.BUSINESS
      ? PRICE_TYPE.excVAT
      : PRICE_TYPE.incVAT,
    product,
  );
  pushDetail('lengthOfLease', lineItem?.vehicleProduct?.term, product);
  pushDetail(
    'initialPayment',
    lineItem?.vehicleProduct?.depositMonths,
    product,
  );
  pushDetail(
    'addMaintenance',
    lineItem?.vehicleProduct?.maintenancePrice,
    product,
  );
};

export const pushPDPDataLayer = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
  category,
}: IPDPData) => {
  if (!window.dataLayer) return;

  const data = {
    event: 'detailView',
    eventCategory: 'Ecommerce',
    eventAction: 'PDP View',
    eventLabel: derivativeInfo?.name || 'undefined',
    eventValue: `${price || 'undefined'}`,
    ecommerce: {
      currencyCode: 'GBP',
      detail: {
        products: [{}],
      },
    },
  };

  const product = data.ecommerce.detail.products[0];
  getProductData({
    capId,
    derivativeInfo,
    vehicleConfigurationByCapId,
    price,
    product,
    category,
  });

  pushDetail(
    'annualMileage',
    vehicleConfigurationByCapId?.financeProfile?.mileage,
    product,
  );

  pushToDataLayer(data);
};

export const pushAddToCartDataLayer = ({
  capId,
  derivativeInfo,
  leaseScannerData,
  values,
  vehicleConfigurationByCapId,
  price,
  category,
}: IPDPData) => {
  const data = {
    event: 'addToCart',
    eventCategory: 'Ecommerce',
    eventAction: 'Order Start',
    eventLabel: derivativeInfo?.name || 'undefined',
    eventValue: `${price || 'undefined'}`,
    ecommerce: {
      currencyCode: 'GBP',
      add: {
        products: [{}],
      },
    },
  };

  const maintenanceCost =
    leaseScannerData?.quoteByCapId?.maintenanceCost?.monthlyRental;
  const lineItem = values?.lineItems[0];
  const product = data.ecommerce.add.products[0];
  getProductData({
    capId,
    derivativeInfo,
    vehicleConfigurationByCapId,
    price,
    product,
    category,
  });

  pushDetail('quantity', lineItem?.quantity, product);
  pushDetail('annualMileage', lineItem?.vehicleProduct?.annualMileage, product);
  pushDetail('journeyType', values?.leaseType, product);
  pushDetail(
    'priceType',
    values?.leaseType === LeaseTypeEnum.BUSINESS
      ? PRICE_TYPE.excVAT
      : PRICE_TYPE.incVAT,
    product,
  );
  pushDetail('lengthOfLease', lineItem?.vehicleProduct?.term, product);

  pushDetail(
    'initialPayment',
    lineItem?.vehicleProduct?.depositMonths,
    product,
  );

  pushDetail(
    'addMaintenance',
    leaseScannerData?.maintenance ? maintenanceCost : null,
    product,
  );

  pushToDataLayer(data);
};

export const pushAboutYouDataLayer = (
  detailsData: GetOlafData_orderByUuid | null,
  derivativeData: GetDerivative_derivative | null,
  type?: string,
) => {
  const lineItem = detailsData?.lineItems[0];
  const price = lineItem?.vehicleProduct?.monthlyPayment;
  const data = {
    event: 'checkout',
    eventCategory: 'Ecommerce',
    eventAction: 'Checkout - Step 1 Complete',
    eventLabel: derivativeData?.name || 'undefined',
    eventValue: `${price || 'undefined'}`,
    ecommerce: {
      currencyCode: 'GBP',
      checkout: {
        actionField: {
          step: '1',
        },
        products: [{}],
      },
    },
  };

  const product = data.ecommerce.checkout.products[0];
  getProductDataForCheckout({
    product,
    detailsData,
    derivativeData,
    price,
    type,
    lineItem,
  });

  pushToDataLayer(data);
};

export const pushSummaryDataLayer = ({
  detailsData,
  derivativeData,
  orderId,
  emailAddress,
  type,
}: ISummary) => {
  const lineItem = detailsData?.lineItems[0];
  const price = lineItem?.vehicleProduct?.monthlyPayment;
  const data = {
    event: 'purchase',
    eventCategory: 'Ecommerce',
    eventAction: 'Order Complete',
    eventLabel: orderId || 'undefined',
    eventValue: `${price || 'undefined'}`,
    ecommerce: {
      visitorEmail: emailAddress ? sha256(emailAddress) : 'undefined',
      currencyCode: 'GBP',
      checkout: {
        actionField: {
          id: orderId,
          revenue: `${price}`,
        },
        products: [{}],
      },
    },
  };

  const product = data.ecommerce.checkout.products[0];
  getProductDataForCheckout({
    product,
    detailsData,
    derivativeData,
    price,
    type,
    lineItem,
  });

  pushToDataLayer(data);
};

export const pushPDPCallBackDataLayer = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
  category,
}: IPDPData) => {
  if (!window.dataLayer) return;

  const data = {
    event: 'enquiry',
    eventCategory: 'Enquiries',
    eventAction: 'Vehicle Enquiry',
    eventLabel: derivativeInfo?.name || 'undefined',
    eventValue: `${price || 'undefined'}`,
  };

  getProductData({
    capId,
    derivativeInfo,
    vehicleConfigurationByCapId,
    price,
    product: data,
    category,
  });

  pushDetail(
    'annualMileage',
    vehicleConfigurationByCapId?.financeProfile?.mileage,
    data,
  );

  pushToDataLayer(data);
};
