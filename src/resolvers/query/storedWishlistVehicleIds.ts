import localforage from 'localforage';
import { GetStoredWishlistVehiclesIds } from '../../../generated/GetStoredWishlistVehiclesIds';

export default function storedWishlistVehicleIds() {
  return localforage.getItem<
    GetStoredWishlistVehiclesIds['storedWishlistVehicleIds']
  >('wishlistVehicleIds');
}
