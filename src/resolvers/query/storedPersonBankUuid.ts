import localforage from 'localforage';
import { GetStoredBankUuidQuery } from '../../../generated/GetStoredBankUuidQuery';

export default function storedPersonBankUuid() {
  return localforage.getItem<GetStoredBankUuidQuery>('bankUuid');
}
