import localForage from 'localforage';
import { ApolloClient } from '@apollo/client';

import {
  GetVehiclePublishState,
  GetVehiclePublishStateVariables,
} from '../../generated/GetVehiclePublishState';
import { initialWishlistState, wishlistVar } from '../cache';
import { IWishlistProduct, IWishlistState } from '../types/wishlist';
import { GET_VEHICLE_PUBLISH_STATE } from '../gql/vehiclePublishState';
import { Nullish } from '../types/common';

export const getLocalWishlistState = async () => {
  const localState = await localForage.getItem('wishlist');
  return (localState ?? initialWishlistState) as IWishlistState;
};

export const setLocalWishlistState = async (state: IWishlistState) => {
  await localForage.setItem('wishlist', state);
};

export const isWished = (
  wishlistVehicles: Array<IWishlistProduct>,
  product: Nullish<IWishlistProduct>,
) => {
  return wishlistVehicles.some(vehicle => {
    return vehicle.capId === product?.capId;
  });
};

export const initializeWishlistState = async (client: ApolloClient<object>) => {
  const { wishlistVehicles } = await getLocalWishlistState();

  if (!wishlistVehicles.length) {
    return wishlistVar({
      wishlistNoLongerAvailable: false,
      wishlistInitialized: true,
      wishlistVehicles,
    });
  }

  const getVehicleDataPromise = (card: IWishlistProduct) => {
    return client.query<
      GetVehiclePublishState,
      GetVehiclePublishStateVariables
    >({
      query: GET_VEHICLE_PUBLISH_STATE,
      variables: {
        capId: parseInt(card.capId ?? '', 10),
        vehicleType: card.vehicleType,
      },
    });
  };

  const resultProductCardList = await Promise.all(
    wishlistVehicles
      .filter(card => card.capId)
      .map(card => getVehicleDataPromise(card)),
  );

  const resultWishlistVehicles = wishlistVehicles.filter(card =>
    resultProductCardList.some(product => {
      const parsedCardId = parseInt(card.capId ?? '', 10);
      const productConfig = product.data.vehicleConfigurationByCapId;

      return (
        productConfig?.capDerivativeId === parsedCardId &&
        productConfig?.published
      );
    }),
  );

  return setLocalWishlistState(
    wishlistVar({
      wishlistInitialized: true,
      wishlistNoLongerAvailable:
        resultWishlistVehicles.length !== wishlistVehicles.length,
      wishlistVehicles: resultWishlistVehicles,
    }),
  );
};
