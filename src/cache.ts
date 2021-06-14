import { makeVar } from '@apollo/client';

import { IWishlistState } from './types/wishlist';

export const initialWishlistState = {
  wishlistInitialized: false,
  wishlistVehicles: [],
};

export const isSessionFinishedCache = makeVar(false);
export const wishlistVar = makeVar<IWishlistState>(initialWishlistState);
