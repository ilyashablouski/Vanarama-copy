import { useReactiveVar } from '@apollo/client';

import {
  isWished,
  getVehicleConfigId,
  setLocalWishlistState,
} from '../utils/wishlistHelpers';
import { IWishlistProduct } from '../types/wishlist';
import { Nullish } from '../types/common';
import { wishlistVar } from '../cache';
import {
  useAddVehicleToWishlist,
  useRemoveVehicleFromWishlist,
} from '../gql/wishlist';
import usePerson from './usePerson';

export default function useWishlist() {
  const {
    wishlistVehicleIds,
    wishlistVehicleMap,
    wishlistInitialized,
    wishlistNoLongerAvailable,
  } = useReactiveVar(wishlistVar);
  const { partyUuid } = usePerson();

  const [addVehicleToWishlist] = useAddVehicleToWishlist();
  const [removeVehicleFromWishlist] = useRemoveVehicleFromWishlist();

  function addToWishlist(product: IWishlistProduct) {
    const configId = getVehicleConfigId(product);

    addVehicleToWishlist({
      variables: {
        vehicleConfigurationIds: [configId],
        partyUuid: partyUuid ?? '',
      },
    }).catch(error => {
      console.error(error);
    });

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

    removeVehicleFromWishlist({
      variables: {
        vehicleConfigurationIds: [configId],
        partyUuid: partyUuid ?? '',
      },
    }).catch(error => {
      console.error(error);
    });

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
