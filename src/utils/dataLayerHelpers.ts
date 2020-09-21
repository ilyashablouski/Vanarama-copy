/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/camelcase */
import { GetVehicleDetails_derivativeInfo } from '../../generated/GetVehicleDetails';

interface IPDPData {
  capId: string | number | null | undefined;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null | undefined;
  price: string | number | null | undefined;
  mileage: string | number | null | undefined;
}

interface IProduct {
  id?: string;
  name?: string;
  price?: string;
  category?: string;
  brand?: string;
  variant?: string;
  vehicleModel?: string;
  annualMileage?: string;
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
  eventLabel: string;
  eventValue: string;
  ecommerce: IEcommerceData;
}

declare global {
  interface Window {
    dataLayer: object[];
  }
}

const getPageInfo = (eventAction: string) => ({
  event: 'detailView',
  eventCategory: 'Ecommerce',
  eventAction,
});

export const pushToDataLayer = (data: IPageDataLayer) => {
  window.dataLayer.push(data);
};

export const pushDetail = (field: string, value: string, product: IProduct) => {
    if(value) product[field] = value;
}

export const pushPDPData = ({
  capId,
  derivativeInfo,
  price,
  mileage,
}: IPDPData) => {
  const data = {
    ...getPageInfo("PDP View"),
    "eventLabel": derivativeInfo?.name,
    "eventValue": price,
    "ecommerce": {
      "currencyCode": "GBP",
      "detail": {
        "products": [{}],
      },
    },
  };

  const product = data.ecommerce.detail.products[0];
  pushDetail("id", capId, product);
  pushDetail("price", price, products);
  pushDetail("category", `${derivativeInfo?.bodyType?.name}`, product);
  pushDetail("brand", `${derivativeInfo?.manufacturer?.name}`, product);
  pushDetail("variant", `${derivativeInfo?.range?.name}`, product);
  pushDetail("vehicleModel", `${derivativeInfo?.range?.name}`, product);
  pushDetail("annualMileage", mileage, product);

  pushToDataLayer(data);
};
