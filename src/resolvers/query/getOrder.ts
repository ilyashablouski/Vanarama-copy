import localforage from 'localforage';
import { OrderInputObject } from '../../../generated/globalTypes';

export default function getOrder() {
  return localforage.getItem<OrderInputObject>('order');
}
