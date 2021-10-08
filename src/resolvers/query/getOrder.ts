import localforage from 'localforage';
import { OrderInputObject } from '../../../generated/globalTypes';

export default function getOrder() {
  if (typeof window !== 'undefined') {
    return localforage.getItem<OrderInputObject>('order');
  }

  return null;
}
