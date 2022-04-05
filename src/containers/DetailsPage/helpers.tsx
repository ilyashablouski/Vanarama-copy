import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
  OrderInputObject,
  PdpVehicleType,
} from '../../../generated/globalTypes';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';
import { GetImacaAssets_getImacaAssets_colours as IImacaColour } from '../../../generated/GetImacaAssets';
import {
  GetPdpContent_pdpContent_banners as IPdpBanner,
  GetPdpContent_pdpContent_content_questionAnswers as IQuestionAnswers,
} from '../../../generated/GetPdpContent';
import { IWishlistProduct } from '../../types/wishlist';
import { Nullable, Nullish } from '../../types/common';

import { formatProductPageUrl } from '../../utils/url';

import RouterLink from '../../components/RouterLink';
import { PdpBanners } from '../../models/enum/PdpBanners';
import { ILeaseScannerData } from '../CustomiseLeaseContainer/interfaces';

export const removeImacaColoursDuplications = (
  colourList: Array<IImacaColour>,
) => {
  const capIds = colourList.map(colour => colour.capId);

  return colourList.filter(
    (colour, index) => !capIds.includes(colour.capId, index + 1),
  );
};

export const filterBannersBySlug = (
  bannerList: Nullable<IPdpBanner>[],
  excludedSlug: PdpBanners,
) => bannerList.filter(banner => banner?.slug !== excludedSlug);

export const convertProductDetailsToWishlistProduct = (
  data: Nullish<GetVehicleDetails>,
) =>
  ({
    capId: `${data?.vehicleImages?.[0]?.capId}`,
    vehicleType: data?.vehicleImages?.[0]?.vehicleType,
    imageUrl: data?.vehicleImages?.[0]?.mainImageUrl,
    averageRating: data?.vehicleDetails?.averageRating,
    keyInformation: data?.vehicleDetails?.keyInformation,
    bodyStyle: data?.derivativeInfo?.bodyStyle?.name,
    pageUrl: formatProductPageUrl(
      data?.vehicleConfigurationByCapId?.legacyUrl,
      `${data?.vehicleImages?.[0]?.capId}`,
    ),
    manufacturerName:
      data?.vehicleConfigurationByCapId?.capManufacturerDescription,
    modelName: data?.vehicleConfigurationByCapId?.capModelDescription,
    derivativeName: data?.vehicleConfigurationByCapId?.capDerivativeDescription,
    rangeName: data?.vehicleConfigurationByCapId?.capRangeDescription,
    offerPosition: data?.vehicleConfigurationByCapId?.offerRanking,
    isOnOffer: data?.vehicleConfigurationByCapId?.onOffer,
    freeInsurance: data?.vehicleDetails?.freeInsurance,
    businessRate: null,
    personalRate: null,
    leadTime: null,
  } as IWishlistProduct);

export const buildAccordionItems = (items: IQuestionAnswers[]) =>
  items.map((item, index) => ({
    id: index,
    title: item?.question || '',
    children: (
      <ReactMarkdown
        allowDangerousHtml
        source={item.answer || ''}
        renderers={{
          link: props => {
            const { href, children } = props;
            return (
              <RouterLink
                link={{ href, label: children }}
                classNames={{ color: 'teal' }}
              />
            );
          },
        }}
      />
    ),
  }));

export const pdpCarType = (data: GetVehicleDetails): PdpVehicleType => {
  switch (true) {
    case data?.vehicleConfigurationByCapId?.onOffer &&
      data.derivativeInfo?.fuelType.name === 'Electric':
      return PdpVehicleType.ElectricHotOffersCars;

    case data.derivativeInfo?.fuelType.name === 'Electric':
      return PdpVehicleType.ElectricCar;

    case data?.vehicleConfigurationByCapId?.onOffer:
      return PdpVehicleType.HotOffersCars;

    default:
      return PdpVehicleType.Car;
  }
};

export const pdpVanType = (data: GetVehicleDetails): PdpVehicleType => {
  switch (true) {
    case data.derivativeInfo?.fuelType.name === 'Electric':
      return PdpVehicleType.ElectricVan;

    case data?.derivativeInfo?.name?.toLowerCase().includes('pick up'):
      return PdpVehicleType.Pickup;

    default:
      return PdpVehicleType.Van;
  }
};

export const parseQuoteParams = (param?: Nullable<string>) =>
  parseInt(param || '', 10) || null;

export function isBannerAvailable(card: IPdpBanner | undefined): boolean {
  if (!card) {
    return false;
  }

  const { startDate, endDate } = card;
  const currentTime = new Date();

  if (!startDate && !endDate) {
    return true;
  }

  if (!startDate && endDate) {
    const endTime = new Date(endDate);

    return currentTime <= endTime;
  }

  if (startDate && !endDate) {
    const startTime = new Date(startDate);

    return currentTime >= startTime;
  }

  if (startDate && endDate) {
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

    return currentTime >= startTime && currentTime <= endTime;
  }

  return true;
}

export const createLeaseSettings = (
  values: OrderInputObject,
  leaseScannerData: Nullable<ILeaseScannerData>,
  data?: GetVehicleDetails,
  mileage?: Nullable<number>,
) => {
  const trim = data?.derivativeInfo?.trims?.find(
    trimItem =>
      trimItem?.optionDescription === values.lineItems[0].vehicleProduct?.trim,
  );

  return {
    capId: values.lineItems[0].vehicleProduct?.derivativeCapId
      ? Number(values.lineItems[0].vehicleProduct.derivativeCapId)
      : null,
    mileage: values.lineItems[0].vehicleProduct?.annualMileage,
    maintenance: values.lineItems[0].vehicleProduct?.maintenance,
    mileageValue: data?.leaseAdjustParams?.mileages
      ? data.leaseAdjustParams.mileages.indexOf(mileage || 0) + 1
      : null,
    term: leaseScannerData?.quoteByCapId?.term,
    upfront: leaseScannerData?.quoteByCapId?.upfront,
    colour: leaseScannerData?.quoteByCapId?.colour,
    trim: trim?.id,
  };
};
