import localforage from 'localforage';
import { SaveStoredBankUuidMutationVariables } from '../../../generated/SaveStoredBankUuidMutation';

export default function savePersonBankUuid(
  rootValue: unknown,
  arg: SaveStoredBankUuidMutationVariables,
) {
  return localforage.setItem<SaveStoredBankUuidMutationVariables>(
    'bankUuid',
    arg,
  );
}
