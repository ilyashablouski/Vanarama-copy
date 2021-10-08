import localforage from 'localforage';
import { GetPerson_getPerson as IPerson } from '../../../generated/GetPerson';

export default function storedPerson() {
  return localforage.getItem<IPerson>('storedPerson');
}
