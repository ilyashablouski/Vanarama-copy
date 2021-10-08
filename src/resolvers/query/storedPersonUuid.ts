import localforage from 'localforage';

export default function storedPersonUuid() {
  return localforage.getItem<string>('personUuid');
}
