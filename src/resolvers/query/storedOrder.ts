import localforage from 'localforage';
import { GetOrder } from '../../../generated/GetOrder';

export default function storedOrder() {
  return localforage.getItem<GetOrder>('order');
}
