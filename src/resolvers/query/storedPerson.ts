import localforage from 'localforage';
import { GetPerson_getPerson as IPerson } from '../../../generated/GetPerson';

export default function storedPerson() {
  if (typeof window !== 'undefined') {
    return localforage.getItem<IPerson>('storedPerson');
  }

  return null;
}
