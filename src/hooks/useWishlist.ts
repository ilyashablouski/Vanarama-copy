import { useReactiveVar } from '@apollo/client';

import { IWishlistProduct } from '../types/wishlist';
import { isWished, setLocalWishlistState } from '../utils/wishlistHelpers';
import { Nullish } from '../types/common';
import { wishlistVar } from '../cache';

export default function useWishlist() {
  const {
    wishlistVehicles,
    wishlistInitialized,
    wishlistNoLongerAvailable,
  } = useReactiveVar(wishlistVar);

  function addToWishlist(product: IWishlistProduct) {
    return wishlistVar({
      ...wishlistVar(),
      wishlistVehicles: [product, ...wishlistVehicles],
    });
  }

  function removeFromWishlist(product: IWishlistProduct) {
    return wishlistVar({
      ...wishlistVar(),
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

  return {
    wishlistVehicles,
    wishlistChange,
    wishlistNoLongerAvailable,
    wishlistInitialized,
  };
}
