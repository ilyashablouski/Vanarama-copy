import localforage from 'localforage';
import { GetStoredItemsToCompareQuery } from '../../../generated/GetStoredItemsToCompareQuery';

export default function storedItemsToCompare() {
  return localforage.getItem<
    GetStoredItemsToCompareQuery['storedItemsToCompare']
  >('compares');
}
