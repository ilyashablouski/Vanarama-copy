import localforage from 'localforage';

export default function storedPersonUuid() {
  if (typeof window !== 'undefined') {
    return localforage.getItem<string>('personUuid');
  }

  return null;
}
