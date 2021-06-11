import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

import {
  isWished,
  IWishlistProduct,
  getLocalWishlistState,
  setLocalWishlistState,
} from '../utils/wishlistHelpers';
import { Nullish } from '../types/common';
import { wishlistVar } from '../cache';

export default function useWishlist() {
  const { wishlistVehicles } = useReactiveVar(wishlistVar);

  async function initWishlistState() {
    const initialState = await getLocalWishlistState();

    if (initialState.wishlistVehicles.length) {
      wishlistVar(initialState);
    }
  }

  useEffect(() => {
    if (!wishlistVehicles.length) {
      initWishlistState();
    }
  }, [wishlistVehicles.length]);

  function addToWishlist(product: IWishlistProduct) {
    return wishlistVar({
      wishlistVehicles: [product, ...wishlistVehicles],
    });
  }

  function removeFromWishlist(product: IWishlistProduct) {
    return wishlistVar({
      wishlistVehicles: wishlistVehicles.filter(
        item => item.capId !== product.capId,
      ),
    });
  }

  function wishlistChange(product: Nullish<IWishlistProduct>) {
    if (!product) {
      return;
    }

    const newState = isWished(wishlistVehicles, product)
      ? removeFromWishlist(product)
      : addToWishlist(product);

    setLocalWishlistState(newState);
  }

  return { wishlistVehicles, wishlistChange };
}
