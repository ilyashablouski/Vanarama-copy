import localforage from 'localforage';
import { GetQuote_storedQuote } from '../../../generated/GetQuote';

export default function saveQuote(
  rootValue: unknown,
  args: GetQuote_storedQuote,
) {
  return localforage.setItem<GetQuote_storedQuote>('quote', args);
}
