import { useEffect, useState } from 'react';
import localForage from 'localforage';

import {
  GetPerson,
  GetPerson_getPerson as Person,
} from '../../generated/GetPerson';

export default function usePerson() {
  const [person, setPerson] = useState<Person | null>(null);
  const [personUuid, setPersonUuid] = useState<string | undefined>();
  const [partyUuid, setPartyUuid] = useState<string | undefined>();
  const [personLoggedIn, setPersonLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (personUuid) {
      return;
    }

    Promise.all([
      localForage.getItem<GetPerson>('person'),
      localForage.getItem<string>('personUuid'),
    ]).then(([personData, savedPersonUuid]) => {
      if (personData?.getPerson) {
        setPerson(personData.getPerson);
        setPersonUuid(personData.getPerson.uuid);
        setPartyUuid(personData.getPerson.partyUuid);
        setPersonLoggedIn(true);
      } else if (savedPersonUuid) {
        setPersonUuid(savedPersonUuid);
        setPersonLoggedIn(false);
      }
    });
  }, [personUuid]);

  return {
    person,
    setPerson,
    personUuid,
    setPersonUuid,
    personLoggedIn,
    setPersonLoggedIn,
    partyUuid,
    setPartyUuid,
  };
}
