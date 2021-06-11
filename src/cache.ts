import { makeVar } from '@apollo/client';

import { IWishlistState, initialWishlistState } from './utils/wishlistHelpers';

export const isSessionFinishedCache = makeVar(false);
export const wishlistVar = makeVar<IWishlistState>(initialWishlistState);
