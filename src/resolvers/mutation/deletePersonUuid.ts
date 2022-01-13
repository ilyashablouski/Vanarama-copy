import localforage from 'localforage';

export default function deletePersonUuid() {
  return localforage.removeItem('personUuid');
}
