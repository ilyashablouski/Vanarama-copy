import localForage from 'localforage';

import { GetPerson } from '../../generated/GetPerson';
import { initialPersonState, personVar } from '../cache';
import createApolloClient from '../apolloClient';
import { getStoredPerson, setStoredPerson } from '../gql/storedPerson';

const client = createApolloClient({});

export const getLocalPersonState = () =>
  Promise.all([
    getStoredPerson(client),
    localForage.getItem<string>('personUuid'),
  ]);

export const setLocalPersonState = (person: GetPerson) =>
  setStoredPerson(client, person.getPerson);

export const setPersonLoggedIn = (person: GetPerson['getPerson']) => {
  personVar({
    ...personVar(),
    personLoggedIn: true,
    person,
  });
};

export const initializePersonState = async () => {
  const [person] = await getLocalPersonState();

  if (person) {
    setPersonLoggedIn(person);
  }
};

export const resetPersonState = () =>
  personVar({
    ...initialPersonState,
  });
