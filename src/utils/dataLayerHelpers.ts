/* eslint-disable @typescript-eslint/camelcase */
import {
  GetVehicleDetails_derivativeInfo,
  GetVehicleDetails_vehicleConfigurationByCapId,
} from '../../generated/GetVehicleDetails';

interface IPDPData {
  capId: string | number | undefined;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  vehicleConfigurationByCapId:
    | GetVehicleDetails_vehicleConfigurationByCapId
    | null
    | undefined;
  price: string | number | null | undefined;
}

interface IProduct {
  [key: string]: string;
}

interface IDetail {
  products: IProduct[];
}

interface IEcommerceData {
  currencyCode: string;
  detail: IDetail;
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

export const pushToDataLayer = (data: IPageDataLayer) => {
  window.dataLayer.push(data);
};

export const pushDetail = (
  field: string,
  value: string | number | null | undefined,
  product: IProduct,
) => {
  if (value) Object.assign(product, { [field]: `${value}` });
};

export const pushPDPDataLayer = ({
  capId,
  derivativeInfo,
  vehicleConfigurationByCapId,
  price,
}: IPDPData) => {
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
  pushDetail('id', capId, product);
  pushDetail('name', derivativeInfo?.name, product);
  pushDetail('price', price, product);
  pushDetail('category', derivativeInfo?.bodyType?.name, product);
  pushDetail(
    'brand',
    vehicleConfigurationByCapId?.capManufacturerDescription,
    product,
  );
  pushDetail(
    'variant',
    vehicleConfigurationByCapId?.capRangeDescription,
    product,
  );
  pushDetail(
    'vehicleModel',
    vehicleConfigurationByCapId?.capModelDescription,
    product,
  );
  pushDetail(
    'annualMileage',
    vehicleConfigurationByCapId?.financeProfile?.mileage,
    product,
  );

  pushToDataLayer(data);
};
