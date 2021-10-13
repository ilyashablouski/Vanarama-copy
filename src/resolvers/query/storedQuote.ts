import localforage from 'localforage';
import { GetQuote } from '../../../generated/GetQuote';

export default function storedQuote() {
  return localforage.getItem<GetQuote>('quote');
}
