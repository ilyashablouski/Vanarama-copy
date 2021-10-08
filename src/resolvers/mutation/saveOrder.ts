import localforage from 'localforage';
import { OrderInputObject } from '../../../generated/globalTypes';

interface ISaveOrderArgs {
  data: OrderInputObject;
}

export default function saveOrder(rootValue: unknown, args: ISaveOrderArgs) {
  if (typeof window !== 'undefined') {
    return localforage.setItem<OrderInputObject>('order', args.data);
  }

  return null;
}
