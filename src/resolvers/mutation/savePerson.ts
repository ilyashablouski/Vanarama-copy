import localforage from 'localforage';
import { GetPerson_getPerson as IPerson } from '../../../generated/GetPerson';

interface ISavePersonArgs {
  person: IPerson | null;
}

export default function savePerson(rootValue: unknown, args: ISavePersonArgs) {
  return localforage.setItem<IPerson | null>('storedPerson', args.person);
}
