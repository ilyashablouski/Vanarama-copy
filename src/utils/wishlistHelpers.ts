import localForage from 'localforage';

import { Nullish } from '../types/common';
import { IWishlistProductType, IWishlistTypes } from '../models/IWishlistTypes';

export const initialWishlistState = {
  wishlistVehicles: [],
};

export const getLocalWishlistState = async () => {
  const localState = await localForage.getItem('wishlist');
  return (localState ?? initialWishlistState) as IWishlistTypes;
};

export const setLocalWishlistState = async (state: IWishlistTypes) => {
  await localForage.setItem('wishlist', state);
};

export const isWished = (
  wishlistVehicles: Array<IWishlistProductType>,
  product: Nullish<IWishlistProductType>,
) => {
  return wishlistVehicles.some(vehicle => {
    return vehicle.capId === product?.capId;
  });
};
