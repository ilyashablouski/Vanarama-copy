/* eslint-disable @typescript-eslint/camelcase */
import { VehicleTypeEnum } from '../../generated/globalTypes';
import {
  GetProductCard_productCard,
  GetProductCard_derivatives,
} from '../../generated/GetProductCard';

type UrlParams = { [key: string]: string | undefined };

export const getUrlParam = (urlParams: UrlParams, notReplace?: boolean) => {
  const url = Object.entries(urlParams).map(([key, value]) =>
    value ? `&${key}=${value}` : '',
  );

  return notReplace ? url.join('') : url.join('').replace('&', '?');
};

const productPageUrlData = (
  productCard: GetProductCard_productCard,
  derivatives: GetProductCard_derivatives[] | null,
): productPageUrlData => {
  const derivativeData = derivatives?.find(el => el.id === productCard.capId);
  return {
    manufacturerName: derivativeData?.manufacturerName || null,
    rangeName: derivativeData?.rangeName || null,
    slug: derivativeData?.slug || null,
    capId: derivativeData?.id || null,
    vehicleType: productCard.vehicleType,
    bodyStyleName: derivativeData?.bodyStyleName || null,
  };
};

export const getProductPageUrl = (
  productCard: GetProductCard_productCard,
  derivatives: GetProductCard_derivatives[] | null,
) => {
  const data = productPageUrlData(productCard, derivatives);
  const leasing =
    data.vehicleType === VehicleTypeEnum.CAR ? '/car-leasing' : '/van-leasing';
  const manufacturer =
    data.manufacturerName
      ?.toLocaleLowerCase()
      .split(' ')
      .join('-') || '';
  const range =
    data.rangeName
      ?.toLocaleLowerCase()
      .split(' ')
      .join('-') || '';
  const bodyStyle =
    data.bodyStyleName
      ?.toLocaleLowerCase()
      .split(' ')
      .join('-') || '';
  const derivative = data.slug || '';

  return data.vehicleType === VehicleTypeEnum.CAR
    ? {
        url: `${leasing}/${manufacturer}/${range}/${bodyStyle}/${derivative}`,
        href: `${leasing}/[...manufacturer]`,
        capId: data.capId as string,
      }
    : {
        url: `${leasing}/${manufacturer}/${range}/${derivative}`,
        href: `${leasing}/[...manufacturer]`,
        capId: data.capId as string,
      };
};

export type productPageUrlData = {
  manufacturerName: string | null;
  rangeName: string | null;
  slug: string | null;
  capId: string | null;
  vehicleType: VehicleTypeEnum | null;
  bodyStyleName?: string | null;
};

/**
 * A type representing the query parameters shape when on the OLAF journey
 */
export type OLAFQueryParams = {
  orderId: string;
  personUuid: string;
  derivativeId: string;
};

/**
 * A type representing the query parameters shape when on the MyDetails journey
 */
export type MyDetailsQueryParams = {
  partyByUuid?: string;
  uuid: string;
};
