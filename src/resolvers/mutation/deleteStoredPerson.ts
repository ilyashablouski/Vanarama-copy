import localforage from 'localforage';

export default function deleteStoredPerson() {
  return localforage.removeItem('storedPerson');
}
