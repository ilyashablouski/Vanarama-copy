import localforage from 'localforage';
import { GetStoredQuote } from '../../../generated/GetStoredQuote';

export default function storedQuote() {
  return localforage.getItem<GetStoredQuote>('quote');
}
