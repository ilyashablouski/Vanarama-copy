import localForage from 'localforage';

import { GetProductCard_productCard as ICard } from '../../generated/GetProductCard';
import { Nullish } from '../types/common';

export interface IProductPageUrl {
  url: string;
  href: string;
  capId: string;
}

export interface IWishlistProduct extends ICard {
  bodyStyle?: Nullish<string>;
  pageUrl?: IProductPageUrl;
}

export interface IWishlistState {
  wishlistVehicles: Array<IWishlistProduct>;
}

export const initialWishlistState = {
  wishlistVehicles: [],
};

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
