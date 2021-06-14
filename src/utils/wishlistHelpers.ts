import localForage from 'localforage';
import { ApolloClient } from '@apollo/client';

import {
  GetProductCard,
  GetProductCard_productCard,
  GetProductCardVariables,
} from '../../generated/GetProductCard';
import { VehicleTypeEnum } from '../../generated/globalTypes';
import { IWishlistProduct, IWishlistState } from '../types/wishlist';
import { GET_PRODUCT_CARDS_DATA } from '../containers/CustomerAlsoViewedContainer/gql';
import { initialWishlistState, wishlistVar } from '../cache';
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

  const getVehicleDataPromise = (vehicleType: VehicleTypeEnum) => {
    return client.query<GetProductCard, GetProductCardVariables>({
      query: GET_PRODUCT_CARDS_DATA,
      variables: {
        vehicleType,
        capIds: wishlistVehicles
          .filter(card => card.capId && card.vehicleType === vehicleType)
          .map(card => card.capId ?? ''),
      },
    });
  };

  const lcvPromise = getVehicleDataPromise(VehicleTypeEnum.LCV);
  const carsPromise = getVehicleDataPromise(VehicleTypeEnum.CAR);
  const result = await Promise.allSettled([carsPromise, lcvPromise]);

  let resultProductCardList: Array<Nullish<GetProductCard_productCard>> = [];

  const carsResult = result[0];
  if (carsResult.status === 'fulfilled') {
    resultProductCardList = [
      ...resultProductCardList,
      ...carsResult.value.data.productCard,
    ];
  }

  const lcvResult = result[1];
  if (lcvResult.status === 'fulfilled') {
    resultProductCardList = [
      ...resultProductCardList,
      ...lcvResult.value.data.productCard,
    ];
  }

  const resultWishlistVehicles = wishlistVehicles.filter(card =>
    resultProductCardList.some(product => product?.capId === card.capId),
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
