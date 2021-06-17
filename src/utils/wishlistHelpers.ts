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
import { Nullable, Nullish } from '../types/common';
import { wishlistVar } from '../cache';
import {
  GetProductCard,
  GetProductCardVariables,
  GetProductCard_productCard,
  GetProductCard_vehicleList_edges,
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

export const initializeWishlistState = async (client: ApolloClient<object>) => {
  const wishlistVehicleIds = await getLocalWishlistState();

  if (!wishlistVehicleIds.length) {
    return wishlistVar({
      ...wishlistVar(),
      wishlistNoLongerAvailable: false,
      wishlistInitialized: true,
    });
  }

  const getVehicleDataPromise = (configId: string) => {
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

  const productCardList = await Promise.all(
    wishlistVehicleIds.map(getVehicleDataPromise),
  );

  const resultWishlistVehicleIds = wishlistVehicleIds.filter(configId => {
    const { capId } = parseVehicleConfigId(configId);

    return productCardList.some(product => {
      const parsedCardId = parseInt(capId ?? '', 10);
      const productConfig = product.data.vehicleConfigurationByCapId;

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
  const getVehicleDataPromise = (requestVehicleType: VehicleTypeEnum) => {
    return client.query<GetProductCard, GetProductCardVariables>({
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        vehicleType: requestVehicleType,
        capIds: wishlistVehicleIds
          .filter(configId => {
            const { vehicleType } = parseVehicleConfigId(configId);
            return vehicleType === requestVehicleType;
          })
          .map(configId => {
            return parseVehicleConfigId(configId).capId;
          }),
      },
    });
  };

  const lcvPromise = getVehicleDataPromise(VehicleTypeEnum.LCV);
  const carsPromise = getVehicleDataPromise(VehicleTypeEnum.CAR);
  const response = await Promise.allSettled([carsPromise, lcvPromise]);

  let productCardList: Array<Nullable<GetProductCard_productCard>> = [];
  let productCardEdgeList: Array<Nullable<
    GetProductCard_vehicleList_edges
  >> = [];

  const carsResponse = response[0];
  if (carsResponse.status === 'fulfilled') {
    productCardEdgeList = [
      ...productCardEdgeList,
      ...carsResponse.value.data.vehicleList.edges,
    ];
    productCardList = [
      ...productCardList,
      ...carsResponse.value.data.productCard,
    ];
  }

  const lcvResponse = response[1];
  if (lcvResponse.status === 'fulfilled') {
    productCardEdgeList = [
      ...productCardEdgeList,
      ...lcvResponse.value.data.vehicleList.edges,
    ];
    productCardList = [
      ...productCardList,
      ...lcvResponse.value.data.productCard,
    ];
  }

  const wishlistVehicleMap: Record<string, IWishlistProduct> = {
    ...wishlistVar().wishlistVehicleMap,
  };

  productCardList.forEach(productCard => {
    if (productCard) {
      const configId = getVehicleConfigId(productCard);
      const pageUrl = formatProductPageUrl(
        getLegacyUrl(productCardEdgeList, productCard.capId),
        productCard.capId,
      );

      wishlistVehicleMap[configId] = {
        ...productCard,
        pageUrl,
      };
    }
  });

  wishlistVar({
    ...wishlistVar(),
    wishlistInitialized: true,
    wishlistVehicleMap,
  });
};
