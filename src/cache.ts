import { makeVar } from '@apollo/client';

import { IWishlistState } from './types/wishlist';

const initialWishlistState = {
  wishlistInitialized: false,
  wishlistNoLongerAvailable: false,
  wishlistVehicleIds: [],
  wishlistVehicleMap: {},
};

export const isSessionFinishedCache = makeVar(false);
export const wishlistVar = makeVar<IWishlistState>(initialWishlistState);
