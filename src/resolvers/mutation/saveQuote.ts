import localforage from 'localforage';
import { SaveQuoteVariables } from '../../../generated/SaveQuote';

export default function saveQuote(
  rootValue: unknown,
  args: SaveQuoteVariables,
) {
  return localforage.setItem<SaveQuoteVariables['quote']>('quote', args.quote);
}
