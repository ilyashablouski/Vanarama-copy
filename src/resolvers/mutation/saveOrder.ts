import localforage from 'localforage';
import { SaveOrderVariables } from '../../../generated/SaveOrder';

export default function saveOrder(
  rootValue: unknown,
  args: SaveOrderVariables,
) {
  return localforage.setItem<SaveOrderVariables>('order', args);
}
