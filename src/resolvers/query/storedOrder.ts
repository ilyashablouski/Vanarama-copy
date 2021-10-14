import localforage from 'localforage';
import { GetStoredOrder } from '../../../generated/GetStoredOrder';

export default function storedOrder() {
  return localforage.getItem<GetStoredOrder>('order');
}
