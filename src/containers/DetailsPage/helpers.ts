import { Nullish } from '../../types/common';
import { IWishlistProduct } from '../../types/wishlist';
import { GetVehicleDetails } from '../../../generated/GetVehicleDetails';
import { formatProductPageUrl } from '../../utils/url';

// eslint-disable-next-line import/prefer-default-export
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
    businessRate: null,
    personalRate: null,
    leadTime: null,
  } as IWishlistProduct);
