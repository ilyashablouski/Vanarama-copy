import Cookies from 'js-cookie';
import localForage from 'localforage';
import { ApolloClient } from '@apollo/client';

import {
  GetProductCard,
  GetProductCardVariables,
  GetProductCard_productCard,
} from '../../generated/GetProductCard';
import {
  GetVehicleConfigList,
  GetVehicleConfigListVariables,
} from '../../generated/GetVehicleConfigList';
import {
  GetWishlistVehicleIds,
  GetWishlistVehicleIdsVariables,
} from '../../generated/GetWishlistVehicleIds';
import {
  GET_WISHLIST_VEHICLE_IDS,
  getWishlistVehicleIdsFromQuery,
} from '../gql/wishlist';
import {
  GET_VEHICLE_CONFIG_LIST,
  getVehicleConfigListFromQuery,
} from '../gql/vehicleConfigList';
import { GET_PRODUCT_CARDS_DATA } from '../containers/CustomerAlsoViewedContainer/gql';
import { formatProductPageUrl, getLegacyUrl } from './url';
import { getVehicleConfigId, parseVehicleConfigId } from './helpers';
import { initialWishlistState, personVar, wishlistVar } from '../cache';
import { IWishlistProduct, IWishlistState } from '../types/wishlist';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { Nullish } from '../types/common';

export const getLocalWishlistState = async () => {
  const wishlistVehicleIds = await localForage.getItem('wishlistVehicleIds');
  return (wishlistVehicleIds ?? []) as Array<string>;
};

export const setLocalWishlistState = (state: IWishlistState) =>
  localForage.setItem('wishlistVehicleIds', state.wishlistVehicleIds);

export const isWishlistEnabled = Cookies.get('DIG-6436') === '1';

export const isWished = (
  wishlistVehicleIds: Array<string>,
  product: Nullish<GetProductCard_productCard>,
) =>
  wishlistVehicleIds.some(configId => {
    return configId === getVehicleConfigId(product);
  });

export const initializeWishlistState = async (client: ApolloClient<object>) => {
  const { person } = personVar();
  let wishlistVehicleIds: Array<string>;

  if (!person?.partyUuid) {
    wishlistVehicleIds = await getLocalWishlistState();
  } else {
    const savedWishlistVehicleIds = await client.query<
      GetWishlistVehicleIds,
      GetWishlistVehicleIdsVariables
    >({
      query: GET_WISHLIST_VEHICLE_IDS,
      variables: {
        partyUuid: person.partyUuid,
      },
    });

    wishlistVehicleIds = getWishlistVehicleIdsFromQuery(
      savedWishlistVehicleIds,
    );
  }

  if (!wishlistVehicleIds.length) {
    return wishlistVar({
      ...wishlistVar(),
      wishlistNoLongerAvailable: false,
      wishlistInitialized: true,
    });
  }

  const vehicleConfigList = await client.query<
    GetVehicleConfigList,
    GetVehicleConfigListVariables
  >({
    query: GET_VEHICLE_CONFIG_LIST,
    variables: {
      configIds: wishlistVehicleIds,
    },
  });

  const resultWishlistVehicleIds = wishlistVehicleIds.filter(configId =>
    getVehicleConfigListFromQuery(vehicleConfigList).some(
      vehicleConfiguration =>
        vehicleConfiguration.configId === configId &&
        vehicleConfiguration.published,
    ),
  );

  return setLocalWishlistState(
    wishlistVar({
      ...wishlistVar(),
      wishlistNoLongerAvailable:
        resultWishlistVehicleIds.length !== wishlistVehicleIds.length,
      wishlistVehicleIds: resultWishlistVehicleIds,
    }),
  );
};

export const resetWishlistNoLongerAvailable = () => {
  wishlistVar({
    ...wishlistVar(),
    wishlistNoLongerAvailable: false,
  });
};

export const updateWishlistState = (wishlistVehicleIds: Array<string>) => {
  wishlistVar({
    ...wishlistVar(),
    wishlistInitialized: !wishlistVehicleIds.length,
    wishlistVehicleIds,
  });
};

export const resetWishlistState = () => {
  wishlistVar({
    ...initialWishlistState,
    wishlistInitialized: true,
  });
};

export const getWishlistVehiclesData = async (
  client: ApolloClient<object>,
  wishlistVehicleIds: Array<string>,
) => {
  const wishlistVehicleMap: Record<string, IWishlistProduct> = {
    ...wishlistVar().wishlistVehicleMap,
  };

  const getVehicleDataPromise = (requestVehicleType: VehicleTypeEnum) =>
    client.query<GetProductCard, GetProductCardVariables>({
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

  const vehicleDataList = await Promise.allSettled([
    getVehicleDataPromise(VehicleTypeEnum.LCV),
    getVehicleDataPromise(VehicleTypeEnum.CAR),
  ]);

  /*
   * collect received productCard data of wished vehicles
   * in the wishlistVehicleMap by "configId" key
   */
  vehicleDataList.forEach(vehicleData => {
    if (vehicleData.status === 'fulfilled') {
      const productCardList = vehicleData.value.data.productCard;
      const vehicleEdgeList = vehicleData.value.data.vehicleList.edges;

      productCardList?.forEach(productCard => {
        if (productCard) {
          const configId = getVehicleConfigId(productCard);
          const productPageUrl = formatProductPageUrl(
            getLegacyUrl(vehicleEdgeList, productCard.capId),
            productCard.capId,
          );

          wishlistVehicleMap[configId] = {
            ...productCard,
            pageUrl: productPageUrl,
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
