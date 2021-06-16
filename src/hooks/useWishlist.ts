import { useReactiveVar } from '@apollo/client';

import {
  isWished,
  getVehicleConfigId,
  setLocalWishlistState,
} from '../utils/wishlistHelpers';
import { IWishlistProduct } from '../types/wishlist';
import { Nullish } from '../types/common';
import { wishlistVar } from '../cache';

export default function useWishlist() {
  const {
    wishlistVehicleIds,
    wishlistVehicleMap,
    wishlistInitialized,
    wishlistNoLongerAvailable,
  } = useReactiveVar(wishlistVar);

  function addToWishlist(product: IWishlistProduct) {
    const configId = getVehicleConfigId(product);

    return wishlistVar({
      ...wishlistVar(),
      wishlistVehicleIds: [configId, ...wishlistVehicleIds],
      wishlistVehicleMap: {
        ...wishlistVehicleMap,
        [configId]: product,
      },
    });
  }

  function removeFromWishlist(product: IWishlistProduct) {
    const configId = getVehicleConfigId(product);
    const newVehicleMap = { ...wishlistVehicleMap };

    delete newVehicleMap[configId];

    return wishlistVar({
      ...wishlistVar(),
      wishlistVehicleMap: newVehicleMap,
      wishlistVehicleIds: wishlistVehicleIds.filter(
        vehicleConfigId => vehicleConfigId !== configId,
      ),
    });
  }

  function wishlistChange(product: Nullish<IWishlistProduct>) {
    if (!product) {
      return;
    }

    const newState = isWished(wishlistVehicleIds, product)
      ? removeFromWishlist(product)
      : addToWishlist(product);

    setLocalWishlistState(newState);
  }

  return {
    wishlistChange,
    wishlistVehicleIds,
    wishlistVehicleMap,
    wishlistNoLongerAvailable,
    wishlistInitialized,
  };
}
