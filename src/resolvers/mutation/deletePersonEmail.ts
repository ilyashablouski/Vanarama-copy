import localforage from 'localforage';

export default function deletePersonEmail() {
  return localforage.removeItem('personEmail');
}
