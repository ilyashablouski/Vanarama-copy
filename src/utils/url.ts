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
  productCard: GetProductCard_productCard | null,
  derivatives: GetProductCard_derivatives[] | null,
): productPageUrlData => {
  const derivativeData = derivatives?.find(el => el.id === productCard?.capId);
  return {
    manufacturer: derivativeData?.manufacturer.slug || null,
    range: derivativeData?.range.slug || null,
    slug: derivativeData?.slug || null,
    capId: derivativeData?.id || null,
    vehicleType: productCard?.vehicleType || null,
    bodyStyle:
      derivativeData?.bodyStyle?.name
        ?.toLocaleLowerCase()
        .split(' ')
        .join('-') || null,
    model: derivativeData?.model.slug || null,
  };
};

export const getProductPageUrl = (
  productCard: GetProductCard_productCard | null,
  derivatives: GetProductCard_derivatives[] | null,
) => {
  const {
    manufacturer,
    range,
    bodyStyle,
    model,
    slug,
    vehicleType,
    capId,
  } = productPageUrlData(productCard, derivatives);

  const leasing =
    vehicleType === VehicleTypeEnum.CAR ? '/car-leasing' : '/van-leasing';

  return vehicleType === VehicleTypeEnum.CAR
    ? {
        url: `${leasing}/${manufacturer}/${range}/${bodyStyle}/${slug}`,
        href: `${leasing}/[...details-page]`,
        capId: capId as string,
      }
    : {
        url: `${leasing}/${manufacturer}/${model}/${slug}`,
        href: `${leasing}/[...details-page]`,
        capId: capId as string,
      };
};

export type productPageUrlData = {
  manufacturer: string | null;
  range: string | null;
  slug: string | null;
  capId: string | null;
  vehicleType: VehicleTypeEnum | null;
  bodyStyle?: string | null;
  model?: string | null;
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
 * A type representing the query parameters shape when on the B2C OLAF journey
 */
export type OLAFB2CQueryParams = {
  orderId: string;
  uuid: string;
};

/**
 * A type representing the query parameters shape when on the MyDetails journey
 */
export type MyDetailsQueryParams = {
  partyByUuid?: string;
  uuid: string;
};
