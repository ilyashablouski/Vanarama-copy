import localforage from 'localforage';
import { GetPerson_getPerson as IPerson } from '../../../generated/GetPerson';

interface ISavePersonArgs {
  person: IPerson;
}

export default function savePerson(rootValue: unknown, args: ISavePersonArgs) {
  if (typeof window !== 'undefined') {
    return localforage.setItem<IPerson>('person', args.person);
  }

  return null;
};