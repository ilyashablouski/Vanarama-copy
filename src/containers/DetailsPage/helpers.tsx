import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Nullish } from '../../types/common';
import { IWishlistProduct } from '../../types/wishlist';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';
import { formatProductPageUrl } from '../../utils/url';
import { GetPdpContent_pdpContent_content_questionAnswers as IQuestionAnswers } from '../../../generated/GetPdpContent';
import RouterLink from '../../components/RouterLink';
import { PdpVehicleType } from '../../../generated/globalTypes';

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

    case !data?.derivativeInfo?.bodyType?.slug?.match('van'):
      return PdpVehicleType.Pickup;

    default:
      return PdpVehicleType.Van;
  }
};
