import localforage from 'localforage';
import { SaveWishlistVehiclesIdsVariables } from '../../../generated/SaveWishlistVehiclesIds';

export default function saveQuote(
  rootValue: unknown,
  args: SaveWishlistVehiclesIdsVariables,
) {
  return localforage.setItem<SaveWishlistVehiclesIdsVariables['ids']>(
    'wishlistVehicleIds',
    args.ids,
  );
}
