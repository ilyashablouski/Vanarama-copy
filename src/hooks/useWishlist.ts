import { useReactiveVar } from '@apollo/client';

import { personVar, wishlistVar } from '../cache';
import { getVehicleConfigId } from '../utils/helpers';
import { isWished, setLocalWishlistState } from '../utils/wishlistHelpers';
import { pushWishlistActionEventDataLayer } from '../utils/dataLayerHelpers';
import { IWishlistActions, IWishlistProduct } from '../types/wishlist';
import { Nullish } from '../types/common';
import {
  useAddVehicleToWishlistMutation,
  useRemoveVehicleFromWishlistMutation,
} from '../gql/wishlist';

export default function useWishlist() {
  const {
    wishlistVehicleIds,
    wishlistVehicleMap,
    wishlistInitialized,
    wishlistNoLongerAvailable,
  } = useReactiveVar(wishlistVar);

  const [addVehicleToWishlist] = useAddVehicleToWishlistMutation();
  const [removeVehicleFromWishlist] = useRemoveVehicleFromWishlistMutation();

  function addToWishlist(product: IWishlistProduct) {
    const configId = getVehicleConfigId(product);

    const { person } = personVar();
    if (person?.partyUuid) {
      addVehicleToWishlist({
        variables: {
          vehicleConfigurationIds: [configId],
          partyUuid: person.partyUuid,
        },
      }).then(() => {
        pushWishlistActionEventDataLayer(IWishlistActions.ADD, product);
      });
    }

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

    const { person } = personVar();
    if (person?.partyUuid) {
      removeVehicleFromWishlist({
        variables: {
          vehicleConfigurationIds: [configId],
          partyUuid: person.partyUuid,
        },
      }).then(() => {
        pushWishlistActionEventDataLayer(IWishlistActions.REMOVE, product);
      });
    }

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
