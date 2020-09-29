import { useEffect, useState } from 'react';
import localForage from 'localforage';

export default function useGetPersonUuid(): string {
  const [personUuid, setPersonUuid] = useState('');
  useEffect(() => {
    const getPersonUuid = async () => {
      const personUuidStorage = (await localForage.getItem(
        'personUuid',
      )) as string;
      if (personUuidStorage) {
        setPersonUuid(personUuidStorage);
      }
    };
    getPersonUuid();
  }, []);
  return personUuid;
}
