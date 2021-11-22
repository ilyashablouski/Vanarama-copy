import localforage from 'localforage';
import { SaveItemsToCompareMutationVariables } from '../../../generated/SaveItemsToCompareMutation';

export default function saveItemsToCompare(
  rootValue: unknown,
  args: SaveItemsToCompareMutationVariables,
) {
  return localforage.setItem<SaveItemsToCompareMutationVariables['items']>(
    'compares',
    args.items,
  );
}
