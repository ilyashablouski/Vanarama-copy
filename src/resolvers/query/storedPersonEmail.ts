import localforage from 'localforage';

export default function storedPersonEmail() {
  if (typeof window !== 'undefined') {
    return localforage.getItem<string | null>('personEmail');
  }

  return null;
}
