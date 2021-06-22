import localForage from 'localforage';
import { ApolloClient } from '@apollo/client';

import { GetPerson } from '../../generated/GetPerson';
import { initialPersonState, personVar } from '../cache';

export const getLocalPersonState = () =>
  Promise.all([
    localForage.getItem<GetPerson>('person'),
    localForage.getItem<string>('personUuid'),
  ]);

export const setLocalPersonState = (person: GetPerson) =>
  localForage.setItem('person', person);

export const setPersonLoggedIn = (person: GetPerson) => {
  personVar({
    ...personVar(),
    personLoggedIn: true,
    person: person.getPerson,
  });
};

export const initializePersonState = async (client: ApolloClient<object>) => {
  const [person] = await getLocalPersonState();

  if (person?.getPerson) {
    setPersonLoggedIn(person);
  }

  return client.onResetStore(async () => {
    personVar({
      ...initialPersonState,
    });
  });
};
