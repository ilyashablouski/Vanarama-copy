import Cookies from 'js-cookie';
import localForage from 'localforage';
import { ApolloClient } from '@apollo/client';

import {
  GetVehiclePublishState,
  GetVehiclePublishStateVariables,
} from '../../generated/GetVehiclePublishState';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { IWishlistProduct, IWishlistState } from '../types/wishlist';
import { GET_VEHICLE_PUBLISH_STATE } from '../gql/vehiclePublishState';
import { GET_PRODUCT_CARDS_DATA } from '../containers/CustomerAlsoViewedContainer/gql';
import { formatProductPageUrl, getLegacyUrl } from './url';
import { Nullish } from '../types/common';
import { wishlistVar } from '../cache';
import {
  GetProductCard,
  GetProductCardVariables,
  GetProductCard_productCard,
} from '../../generated/GetProductCard';

export const getLocalWishlistState = async () => {
  const wishlistVehicleIds = await localForage.getItem('wishlistVehicleIds');
  return (wishlistVehicleIds ?? []) as Array<string>;
};

export const setLocalWishlistState = async (state: IWishlistState) => {
  await localForage.setItem('wishlistVehicleIds', state.wishlistVehicleIds);
};

export const isWishlistEnabled = Cookies.get('DIG-6436') === '1';

export const getVehicleConfigId = (product: Nullish<IWishlistProduct>) =>
  `${product?.vehicleType}-${product?.capId}`;

export const parseVehicleConfigId = (configId: string) => {
  const [vehicleType, capId] = configId.split('-');

  return { vehicleType, capId } as {
    vehicleType: VehicleTypeEnum;
    capId: string;
  };
};

export const isWished = (
  wishlistVehicleIds: Array<string>,
  product: Nullish<GetProductCard_productCard>,
) =>
  wishlistVehicleIds.some(configId => {
    return configId === getVehicleConfigId(product);
  });

export const resetWishlistNoLongerAvailable = () => {
  wishlistVar({
    ...wishlistVar(),
    wishlistNoLongerAvailable: false,
  });
};

export const initializeWishlistState = async (client: ApolloClient<object>) => {
  const wishlistVehicleIds = await getLocalWishlistState();

  if (!wishlistVehicleIds.length) {
    return wishlistVar({
      ...wishlistVar(),
      wishlistNoLongerAvailable: false,
      wishlistInitialized: true,
    });
  }

  const getVehiclePublishStatePromise = (configId: string) => {
    const { capId, vehicleType } = parseVehicleConfigId(configId);

    return client.query<
      GetVehiclePublishState,
      GetVehiclePublishStateVariables
    >({
      query: GET_VEHICLE_PUBLISH_STATE,
      variables: {
        capId: parseInt(capId, 10),
        vehicleType,
      },
    });
  };

  const productDetailList = await Promise.all(
    wishlistVehicleIds.map(getVehiclePublishStatePromise),
  );

  const resultWishlistVehicleIds = wishlistVehicleIds.filter(configId => {
    const { capId } = parseVehicleConfigId(configId);

    return productDetailList.some(({ data }) => {
      const parsedCardId = parseInt(capId ?? '', 10);
      const productConfig = data.vehicleConfigurationByCapId;

      return (
        productConfig?.capDerivativeId === parsedCardId &&
        productConfig?.published
      );
    });
  });

  return setLocalWishlistState(
    wishlistVar({
      ...wishlistVar(),
      wishlistNoLongerAvailable:
        resultWishlistVehicleIds.length !== wishlistVehicleIds.length,
      wishlistVehicleIds: resultWishlistVehicleIds,
    }),
  );
};

export const getWishlistVehiclesData = async (
  client: ApolloClient<object>,
  wishlistVehicleIds: Array<string>,
) => {
  const wishlistVehicleMap: Record<string, IWishlistProduct> = {
    ...wishlistVar().wishlistVehicleMap,
  };

  const getVehicleDataPromise = (requestVehicleType: VehicleTypeEnum) => {
    return client.query<GetProductCard, GetProductCardVariables>({
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        vehicleType: requestVehicleType,
        capIds: wishlistVehicleIds.reduce((capIds, configId) => {
          const { capId, vehicleType } = parseVehicleConfigId(configId);
          if (vehicleType === requestVehicleType) {
            capIds.push(capId);
          }
          return capIds;
        }, [] as Array<string>),
      },
    });
  };

  const responseList = await Promise.allSettled([
    getVehicleDataPromise(VehicleTypeEnum.LCV),
    getVehicleDataPromise(VehicleTypeEnum.CAR),
  ]);

  responseList.forEach(response => {
    if (response.status === 'fulfilled') {
      const cardList = response.value.data.productCard;
      const edgeList = response.value.data.vehicleList.edges;

      cardList?.forEach(productCard => {
        if (productCard) {
          const configId = getVehicleConfigId(productCard);
          const pageUrl = formatProductPageUrl(
            getLegacyUrl(edgeList, productCard.capId),
            productCard.capId,
          );

          wishlistVehicleMap[configId] = {
            ...productCard,
            pageUrl,
          };
        }
      });
    }
  });

  wishlistVar({
    ...wishlistVar(),
    wishlistInitialized: true,
    wishlistVehicleMap,
  });
};
