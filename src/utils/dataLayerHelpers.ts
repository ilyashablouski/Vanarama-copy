/* eslint-disable no-console */

import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import { NextRouter, Router, SingletonRouter } from 'next/router';
import { routerItems } from '../core/atoms/breadcrumbs-v2/helpers';
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
import { GetDerivative_derivative } from '../../generated/GetDerivative';
import { IWishlistActions, IWishlistProduct } from '../types/wishlist';
import { PAGES, SITE_SECTIONS } from './pageTypes';
import { getDeviceType } from './deviceType';
import { getSessionStorage } from './windowSessionStorage';
import { CurrencyCodeEnum, FuelTypeEnum } from '../../entities/global';
import createApolloClient from '../apolloClient';
import { getStoredPerson } from '../gql/storedPerson';
import { getStoredPersonEmail } from '../gql/storedPersonEmail';
import { getStoredPersonUuid } from '../gql/storedPersonUuid';
import { Nullish } from '../types/common';
import { getLocalStorage } from './windowLocalStorage';
import { isBCSessionIDDelayFeatureFlagEnabled } from './helpers';

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
  mileage?: number | null;
  vehicleValue?: number | null;
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
  vehicleValue?: string;
}

interface IPageData {
  router?: Router | SingletonRouter | NextRouter;
  pageType?: string;
  siteSection?: string;
  isElectricPdp?: boolean;
  initialFilterFuelType?: Nullish<string>;
}

interface ICategory {
  cars: Nullish<boolean>;
  vans: Nullish<boolean>;
  pickups: Nullish<boolean>;
  electricCars?: Nullish<boolean>;
}

interface IPdpOrSearchElectricSection {
  initialFilterFuelType?: Nullish<string>;
  isElectricPdp?: boolean;
  queryFuelTypes?: string[] | Nullish<string>;
  queryDynamicParam?: string[] | Nullish<string>;
}

declare global {
  interface Window {
    dataLayerHasGtmDomEvent: (dataLayer: object[]) => boolean;
    dataLayerCallback: () => void;
    dataLayer: object[];
  }
}

const PRICE_TYPE = {
  excVAT: 'Excluding VAT',
  incVAT: 'Including VAT',
};

let pageDataForDataLayer = {};

const client = createApolloClient({});

export const pushPageViewEvent = async (path: string, title = '') => {
  window.dataLayer?.push({
    event: 'pageview',
    page: {
      path,
      title,
    },
    pageMode: path.includes('.html') || path.slice(1) === '' ? 'no-SPA' : 'SPA',
    cookiePreferences: getLocalStorage('cookiePreferences') || 'undefined',
  });
};

export const getCategory = ({
  cars,
  pickups,
  electricCars,
}: ICategory): string => {
  if (cars) {
    return 'Car';
  }
  if (pickups) {
    return 'Pickup';
  }
  if (electricCars) {
    return 'EV';
  }
  return 'Van';
};

const isCarsCategory = (
  lineItem: Nullish<LineItemInputObject>,
  derivativeData: Nullable<GetDerivative_derivative>,
): boolean =>
  Boolean(
    lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.CAR &&
      !derivativeData?.fuelType?.name?.includes('Electric'),
  );

const isElectricCarsCategory = (
  lineItem: Nullish<LineItemInputObject>,
  derivativeData: Nullable<GetDerivative_derivative>,
): boolean =>
  Boolean(
    lineItem?.vehicleProduct?.vehicleType === VehicleTypeEnum.CAR &&
      derivativeData?.fuelType?.name?.includes('Electric'),
  );

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
      cars: isCarsCategory(lineItem, derivativeData),
      pickups: derivativeData?.bodyType?.name?.includes('Pick-Up'),
      electricCars: isElectricCarsCategory(lineItem, derivativeData),
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
    fuelType: derivativeData?.fuelType?.name || 'undefined',
    marketingCategory: derivativeData?.bodyStyle?.name || 'undefined',
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
};

export const pushDetail = (
  field: string,
  value: string | number | null | undefined,
  product?: IProduct,
) => {
  if (value) {
    Object.assign(product, { [field]: `${value}` });
  }
};

export const checkForGtmDomEvent = (callback: () => void) => {
  window.dataLayerCallback = callback;

  if (
    window.dataLayerHasGtmDomEvent &&
    window.dataLayerHasGtmDomEvent(window.dataLayer)
  ) {
    callback();
  }
};

export const isPdpOrSearchElectricSection = ({
  initialFilterFuelType,
  isElectricPdp,
  queryFuelTypes,
  queryDynamicParam,
}: IPdpOrSearchElectricSection): boolean => {
  const isElectricPage =
    isElectricPdp ||
    [initialFilterFuelType, queryFuelTypes, queryDynamicParam].some(
      param => param === FuelTypeEnum.ELECTRIC || param === 'electric',
    );

  return isElectricPage;
};

export const pushPageData = async ({
  router,
  pageType,
  siteSection,
  isElectricPdp,
  initialFilterFuelType,
}: IPageData) => {
  if (!window.dataLayer) {
    return;
  }

  const [person, personUuid, email] = await Promise.all([
    getStoredPerson(client, 'no-cache'),
    getStoredPersonUuid(client, 'no-cache'),
    getStoredPersonEmail(client, 'no-cache'),
  ]);
  const personEmail = person?.emailAddresses?.[0]?.value || email;
  const pathname = router?.pathname;
  const queryFuelTypes = router?.query.fuelTypes;
  const queryDynamicParam = router?.query.dynamicParam;

  if (
    pathname === '/car-leasing/[dynamicParam]' ||
    pathname === '/van-leasing/[dynamicParam]' ||
    pathname === '/car-leasing/[dynamicParam]/[rangeName]' ||
    pathname === '/van-leasing/[dynamicParam]/[rangeName]' ||
    pathname === '/car-leasing/search' ||
    pathname === '/van-leasing/search'
  ) {
    if (!pageType) {
      return;
    }
    pageDataForDataLayer = {
      pageType,
      siteSection: isPdpOrSearchElectricSection({
        initialFilterFuelType,
        isElectricPdp,
        queryFuelTypes,
        queryDynamicParam,
      })
        ? SITE_SECTIONS.electric
        : siteSection,
    };
  } else {
    const pageData = PAGES.find(pages =>
      pages.pages.find(page => pathname?.includes(page)),
    );

    pageDataForDataLayer = {
      pageType: pageData?.pageType || 'undefined',
      siteSection: isPdpOrSearchElectricSection({
        initialFilterFuelType,
        isElectricPdp,
        queryFuelTypes,
        queryDynamicParam,
      })
        ? SITE_SECTIONS.electric
        : pageData?.siteSection || 'undefined',
    };
  }

  if (isBCSessionIDDelayFeatureFlagEnabled()) {
    const MAX_NUMBER_OF_ATTEMPTS = 3;

    const pushDetailsAfterCheckBCUID = () => {
      pushDetail('BCUID', 'undefined', pageDataForDataLayer);
      pushDetail(
        'customerId',
        person?.uuid || personUuid || 'undefined',
        pageDataForDataLayer,
      );
      pushDetail('deviceType', getDeviceType(), pageDataForDataLayer);
      pushDetail(
        'visitorEmail',
        personEmail ? sha256(personEmail) : 'undefined',
        pageDataForDataLayer,
      );

      window.dataLayer.push(pageDataForDataLayer);
    };

    const delayedPushDetails = () => {
      let attemptNumber = 0;
      const intervalID = setInterval(() => {
        const blueConicCookie = Cookies.get('BCSessionID');
        attemptNumber += 1;
        if (
          typeof blueConicCookie === 'undefined' ||
          attemptNumber === MAX_NUMBER_OF_ATTEMPTS
        ) {
          pushDetailsAfterCheckBCUID();
          clearInterval(intervalID);
        }
      }, 100);
    };

    delayedPushDetails();
  } else {
    pushDetail('BCUID', 'undefined', pageDataForDataLayer);
    pushDetail(
      'customerId',
      person?.uuid || personUuid || 'undefined',
      pageDataForDataLayer,
    );
    pushDetail('deviceType', getDeviceType(), pageDataForDataLayer);
    pushDetail(
      'visitorEmail',
      personEmail ? sha256(personEmail) : 'undefined',
      pageDataForDataLayer,
    );

    window.dataLayer.push(pageDataForDataLayer);
  }
};

const getProductData = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
  product,
  category,
  vehicleValue,
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
  pushDetail('retailPrice', vehicleValue, product);
  pushDetail(
    'fuelType',
    derivativeInfo?.fuelType?.name || 'undefined',
    product,
  );
  pushDetail(
    'marketingCategory',
    derivativeInfo?.bodyStyle?.name || 'undefined',
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
  pushDetail(
    'fuelType',
    derivativeData?.fuelType?.name || 'undefined',
    product,
  );
  pushDetail(
    'marketingCategory',
    derivativeData?.bodyStyle?.name || 'undefined',
    product,
  );
};

export const pushPDPDataLayer = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
  category,
  mileage,
  vehicleValue,
}: IPDPData) => {
  if (!window.dataLayer) {
    return;
  }

  const data = {
    event: 'detailView',
    eventCategory: 'Ecommerce',
    eventAction: 'PDP View',
    eventLabel:
      `${derivativeInfo?.manufacturer.name} ${derivativeInfo?.model.name} ${derivativeInfo?.name}` ||
      'undefined',
    eventValue: `${price || 'undefined'}`,
    ecommerce: {
      currencyCode: CurrencyCodeEnum.GBP,
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
    vehicleValue,
  });

  pushDetail(
    'annualMileage',
    mileage || vehicleConfigurationByCapId?.financeProfile?.mileage,
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
  vehicleValue,
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
      currencyCode: CurrencyCodeEnum.GBP,
      add: {
        products: [{}],
      },
    },
  };

  const maintenanceCost =
    leaseScannerData?.quoteByCapId?.maintenanceCost?.monthlyRental;
  const lineItem = values?.lineItems?.[0];
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

  pushDetail('retailPrice', vehicleValue, product);

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
      currencyCode: CurrencyCodeEnum.GBP,
      checkout: {
        actionField: {
          step: '1',
        },
        products: [productsMapper(detailsData, derivativeData)],
      },
    },
  };

  const product = data.ecommerce.checkout.products[0];
  const vehicleValue = getSessionStorage('vehicleValue');
  pushDetail('retailPrice', vehicleValue, product);
  getProductDataForCheckout({
    product,
    detailsData,
    derivativeData,
    price,
    type: getCategory({
      cars: isCarsCategory(lineItem, derivativeData),
      pickups: derivativeData?.bodyType?.name?.includes('Pick-Up'),
      electricCars: isElectricCarsCategory(lineItem, derivativeData),
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
      currencyCode: CurrencyCodeEnum.GBP,
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
  const vehicleValue = getSessionStorage('vehicleValue');
  pushDetail('retailPrice', vehicleValue, product);
  getProductDataForCheckout({
    product,
    detailsData,
    derivativeData,
    price,
    type: getCategory({
      cars: isCarsCategory(lineItem, derivativeData),
      pickups: derivativeData?.bodyType?.name?.includes('Pick-Up'),
      electricCars: isElectricCarsCategory(lineItem, derivativeData),
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
  vehicleValue,
}: IPDPData) => {
  if (!window.dataLayer) {
    return;
  }

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

  pushDetail('retailPrice', vehicleValue, data);

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

const mapWishlistProduct = (product: IWishlistProduct) => ({
  id: `${product.capId || undefined}`,
  price: `${product.personalRate || undefined}`,
  category: `${product.vehicleType || undefined}`,
  brand: `${product.manufacturerName || undefined}`,
  variant: `${product.rangeName || undefined}`,
  vehicleModel: `${product.modelName || undefined}`,
  fuelType: `${product.keyInformation?.find(item => item?.name === 'Fuel Type')
    ?.value || undefined}`,
});

const getWishlistEventDataByActionType = (action: IWishlistActions) => {
  switch (action) {
    case IWishlistActions.ADD:
      return {
        event: 'wishlistAdd',
        eventAction: 'Add To Wishlist',
      };
    case IWishlistActions.REMOVE:
      return {
        event: 'wishlistOut',
        eventAction: 'Remove From Wishlist',
      };
    case IWishlistActions.VIEW:
      return {
        event: 'wishlistView',
        eventAction: 'Wishlist View',
      };
    default:
      return {
        event: 'undefined',
        eventAction: 'undefined',
      };
  }
};

export const pushWishlistActionEventDataLayer = (
  action: IWishlistActions,
  wishlistData: IWishlistProduct[] | IWishlistProduct,
) => {
  const data = {
    ...getWishlistEventDataByActionType(action),
    eventCategory: 'Ecommerce',
    eventLabel: !Array.isArray(wishlistData)
      ? `${wishlistData.manufacturerName} ${wishlistData.modelName} ${wishlistData.derivativeName}`
      : 'undefined',
    eventValue: !Array.isArray(wishlistData)
      ? `${wishlistData.personalRate}`
      : 'undefined',
    ecommerce: {
      currencyCode: CurrencyCodeEnum.GBP,
      detail: {
        products: Array.isArray(wishlistData)
          ? wishlistData.map(mapWishlistProduct)
          : [mapWishlistProduct(wishlistData)],
      },
    },
  };

  pushToDataLayer(data);
};

export const pushCookiePreferencesDataLayer = () => {
  if (!window.dataLayer) {
    return;
  }

  window.dataLayer?.push({
    cookiePreferences: getLocalStorage('cookiePreferences'),
  });
};

export const pushPageDataWithBCUID = () => {
  pushDetail(
    'BCUID',
    Cookies.get('BCSessionID') || 'undefined',
    pageDataForDataLayer,
  );
  window.dataLayer.push(pageDataForDataLayer);
};
