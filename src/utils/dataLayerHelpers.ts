/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
import Cookies from 'js-cookie';
import localForage from 'localforage';
import { sha256 } from 'js-sha256';
import { NextRouter } from 'next/router';
import { routerItems } from '../components/Breadcrumb/helpers';
import { ILeaseScannerData } from '../containers/CustomiseLeaseContainer/interfaces';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_vehicleConfigurationByCapId,
} from '../../generated/GetVehicleDetails';
import {
  LeaseTypeEnum,
  LineItemInputObject,
  OrderInputObject,
  VehicleTypeEnum,
} from '../../generated/globalTypes';
import { GetPerson } from '../../generated/GetPerson';
import { GetDerivative_derivative } from '../../generated/GetDerivative';
import { PAGES } from './pageTypes';
import { getDeviceType } from './deviceType';

interface ICheckoutData {
  price: string | number | null | undefined;
  product?: IProduct;
  detailsData: OrderInputObject | null;
  derivativeData: GetDerivative_derivative | null;
  lineItem: LineItemInputObject | undefined;
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
  detailsData: OrderInputObject | null;
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
  eventValue?: string | undefined;
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

interface IPageData {
  pathname?: string;
  pageType?: string;
  siteSection?: string;
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

export const productsMapper = (
  detailsData: OrderInputObject | null,
  derivativeData: GetDerivative_derivative | null,
) => {
  const lineItem = detailsData?.lineItems?.[0];
  return {
    id: derivativeData?.id || 'undefined',
    name: derivativeData?.name || 'undefined',
    price: `${lineItem?.vehicleProduct?.monthlyPayment}` || 'undefined',
    category: getCategory({
      cars: lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.CAR,
      pickups: derivativeData?.bodyType?.name?.includes('Pick-Up'),
      vans: lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.LCV,
    }),
    brand: derivativeData?.manufacturer.name || 'undefined',
    variant: derivativeData?.range.name || 'undefined',
    quantity: `${lineItem?.quantity}`,
    vehicleModel: derivativeData?.bodyType?.name || 'undefined',
    annualMileage: `${lineItem?.vehicleProduct?.annualMileage}` || 'undefined',
    journeyType: detailsData?.leaseType || 'undefined',
    priceType:
      detailsData?.leaseType === LeaseTypeEnum.BUSINESS
        ? PRICE_TYPE.excVAT
        : PRICE_TYPE.incVAT,
    lengthOfLease: `${lineItem?.vehicleProduct?.term}` || 'undefined',
    initialPayment:
      `${lineItem?.vehicleProduct?.depositPayment}` || 'undefined',
    addMaintenance: lineItem?.vehicleProduct?.maintenancePrice ? 'Yes' : 'No',
  };
};

export const getCategoryAboutYouData = (
  derivativeData: GetDerivative_derivative | null,
) => {
  if (derivativeData?.bodyType?.name?.includes('Pick-Up')) {
    return 'Pickup';
  }

  return 'Van';
};

export const pushToDataLayer = (data: IPageDataLayer) => {
  window.dataLayer?.push(data);
  console.log('dataLayer', window.dataLayer);
};

export const pushDetail = (
  field: string,
  value: string | number | null | undefined,
  product?: IProduct,
) => {
  if (value) Object.assign(product, { [field]: `${value}` });
};

// const setDataLayer = () => {
//   if (
//     !window.dataLayer.find(obj =>
//       Object.keys(obj).some(key => key === 'pageType'),
//     )
//   )
//     return;

//   window.dataLayer = [];
//   window.dataLayer.push({
//     'gtm.start': new Date().getTime(),
//     event: 'gtm.js',
//   });
// };

export const pushPageData = async ({
  pathname,
  pageType,
  siteSection,
}: IPageData) => {
  if (!window.dataLayer) return;
  // setDataLayer();
  const personData = (await localForage.getItem('person')) as GetPerson | null;
  const personUuid = (await localForage.getItem('personUuid')) as string | null;
  const person = personData?.getPerson;
  const personEmail =
    (person?.emailAddresses && person?.emailAddresses[0]?.value) ||
    ((await localForage.getItem('personEmail')) as string | null);

  let data = {};

  if (
    pathname === '/car-leasing/[dynamicParam]' ||
    pathname === '/van-leasing/[dynamicParam]'
  ) {
    if (!pageType) return;
    data = {
      pageType,
      siteSection,
    };
  } else {
    const pageData = PAGES.find(pages =>
      pages.pages.find(page => pathname?.includes(page)),
    );

    data = {
      pageType: pageData?.pageType || 'undefined',
      siteSection: pageData?.siteSection || 'undefined',
    };
  }

  pushDetail('BCUID', Cookies.get('BCSessionID') || 'undefined', data);
  pushDetail('customerId', person?.uuid || personUuid || 'undefined', data);
  pushDetail('deviceType', getDeviceType(), data);
  pushDetail(
    'visitorEmail',
    personEmail ? sha256(personEmail) : 'undefined',
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

  pushDetail('id', capId, product);
  pushDetail(
    'name',
    `${derivativeInfo?.manufacturer.name} ${derivativeInfo?.model.name} ${derivativeInfo?.name}`,
    product,
  );
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
    derivativeInfo?.bodyType?.name || 'undefined',
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
    derivativeData?.bodyType?.name || 'undefined',
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
    eventLabel:
      `${derivativeInfo?.manufacturer.name} ${derivativeInfo?.model.name} ${derivativeInfo?.name}` ||
      'undefined',
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
    eventLabel:
      `${derivativeInfo?.manufacturer.name} ${derivativeInfo?.model.name} ${derivativeInfo?.name}` ||
      'undefined',
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
  detailsData: OrderInputObject | null,
  derivativeData: GetDerivative_derivative | null,
) => {
  const lineItem = detailsData?.lineItems?.[0];
  const price = lineItem?.vehicleProduct?.monthlyPayment;
  const data = {
    event: 'checkout',
    eventCategory: 'Ecommerce',
    eventAction: 'Checkout - Step 1 Complete',
    eventLabel:
      `${derivativeData?.manufacturer.name} ${derivativeData?.model.name} ${derivativeData?.name}` ||
      'undefined',
    eventValue: `${price || 'undefined'}`,
    ecommerce: {
      currencyCode: 'GBP',
      checkout: {
        actionField: {
          step: '1',
        },
        products: [productsMapper(detailsData, derivativeData)],
      },
    },
  };

  const product = data.ecommerce.checkout.products[0];
  getProductDataForCheckout({
    product,
    detailsData,
    derivativeData,
    price,
    type: getCategory({
      cars: lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.CAR,
      pickups: derivativeData?.bodyType?.name?.includes('Pick-Up'),
      vans: lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.LCV,
    }),
    lineItem,
  });

  pushToDataLayer(data);
};

export const pushSummaryDataLayer = ({
  detailsData,
  derivativeData,
  orderId,
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
      currencyCode: 'GBP',
      purchase: {
        actionField: {
          id: orderId,
          revenue: `${price}`,
        },
        products: [productsMapper(detailsData, derivativeData)],
      },
    },
  };

  const product = data.ecommerce.purchase.products[0];
  getProductDataForCheckout({
    product,
    detailsData,
    derivativeData,
    price,
    type: getCategory({
      cars: lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.CAR,
      pickups: derivativeData?.bodyType?.name?.includes('Pick-Up'),
      vans: lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.LCV,
    }),
    lineItem,
  });

  pushToDataLayer(data);
};

export const pushInsuranceEventDataLayer = (router: NextRouter) => {
  const eventLabel = routerItems(router).pop()?.link.label;
  const data = {
    event: 'enquiry',
    eventCategory: 'Enquiries',
    eventAction: 'Insurance Enquiry',
    eventLabel,
  };

  pushToDataLayer(data);
};

export const pushCallBackDataLayer = ({
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
    eventLabel:
      `${derivativeInfo?.manufacturer.name} ${derivativeInfo?.model.name} ${derivativeInfo?.name}` ||
      'undefined',
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

export const pushAuthorizationEventDataLayer = (register?: boolean) => {
  const data = {
    event: register ? 'register' : 'login',
    eventCategory: 'Account',
    eventAction: register ? 'Register' : 'Login',
    eventLabel: register ? 'Account/Register' : 'Account/Login',
  };

  pushToDataLayer(data);
};
