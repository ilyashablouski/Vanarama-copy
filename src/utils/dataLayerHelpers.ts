/* eslint-disable @typescript-eslint/camelcase */
import localForage from 'localforage';
import { ILeaseScannerData } from '../containers/CustomiseLeaseContainer/interfaces';
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_vehicleConfigurationByCapId,
} from '../../generated/GetVehicleDetails';
import { OrderInputObject, LeaseTypeEnum } from '../../generated/globalTypes';
import { PersonByToken } from '../../generated/PersonByToken';

interface IPDPData {
  capId: string | number | undefined;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  vehicleConfigurationByCapId:
    | GetVehicleDetails_vehicleConfigurationByCapId
    | null
    | undefined;
  leaseScannerData?: ILeaseScannerData | null;
  price: string | number | null | undefined;
  values?: OrderInputObject;
  product?: IProduct;
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
  ecommerce: IEcommerceData;
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

export const pushPageData = async (siteSection: string) => {
  if (!window.dataLayer) return;
  const person = (await localForage.getItem('person')) as PersonByToken | null;

  const data = {
    pageType: 'PDP',
    siteSection,
  };

  pushDetail('customerId', person?.personByToken?.uuid, data);
  window.dataLayer.push(data);
};

const getProductData = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
  product,
}: IPDPData) => {
  const isPickup = derivativeInfo?.bodyType?.name?.includes('Pick');
  const variant = vehicleConfigurationByCapId?.capRangeDescription;
  const vehicleModel = vehicleConfigurationByCapId?.capModelDescription;

  pushDetail('id', capId, product);
  pushDetail('name', derivativeInfo?.name, product);
  pushDetail('price', price, product);
  pushDetail(
    'category',
    isPickup ? 'Pickup' : derivativeInfo?.bodyType?.name,
    product,
  );
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

export const pushPDPDataLayer = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
}: IPDPData) => {
  if (!window.dataLayer) return;

  const data = {
    event: 'detailView',
    eventCategory: 'Ecommerce',
    eventAction: 'PDP View',
    eventLabel: derivativeInfo?.name,
    eventValue: `${price}`,
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
}: IPDPData) => {
  const data = {
    event: 'addToCart',
    eventCategory: 'Ecommerce',
    eventAction: 'Order Start',
    eventLabel: derivativeInfo?.name,
    eventValue: `${price}`,
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
