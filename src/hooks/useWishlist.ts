import { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';

import { wishlistVar } from '../cache';
import { IWishlistProductType } from '../models/IWishlistTypes';
import {
  isWished,
  getLocalWishlistState,
  setLocalWishlistState,
} from '../utils/wishlistHelpers';

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

  function addToWishlist(product: IWishlistProductType) {
    return wishlistVar({
      wishlistVehicles: [product, ...wishlistVehicles],
    });
  }

  function removeFromWishlist(product: IWishlistProductType) {
    return wishlistVar({
      wishlistVehicles: wishlistVehicles.filter(
        item => item.capId !== product.capId,
      ),
    });
  }

  function wishlistChange(product: IWishlistProductType) {
    const newState = isWished(wishlistVehicles, product)
      ? removeFromWishlist(product)
      : addToWishlist(product);

    setLocalWishlistState(newState);
  }

  return { wishlistVehicles, wishlistChange };
}
