import { makeVar } from '@apollo/client';

import { IWishlistTypes } from './models/IWishlistTypes';
import { initialWishlistState } from './utils/wishlistHelpers';

export const isSessionFinishedCache = makeVar(false);
export const wishlistVar = makeVar<IWishlistTypes>(initialWishlistState);
