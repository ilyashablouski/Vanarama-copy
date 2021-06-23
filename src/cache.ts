import { makeVar } from '@apollo/client';

import { IPersonState } from './types/person';
import { IWishlistState } from './types/wishlist';

export const initialPersonState: IPersonState = {
  personLoggedIn: false,
  person: null,
};
export const initialWishlistState: IWishlistState = {
  wishlistInitialized: false,
  wishlistNoLongerAvailable: false,
  wishlistVehicleIds: [],
  wishlistVehicleMap: {},
};

export const isSessionFinishedCache = makeVar(false);
export const wishlistVar = makeVar(initialWishlistState);
export const personVar = makeVar(initialPersonState);
