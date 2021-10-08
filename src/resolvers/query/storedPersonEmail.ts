import localforage from 'localforage';

export default function storedPersonEmail() {
  return localforage.getItem<string | null>('personEmail');
}
