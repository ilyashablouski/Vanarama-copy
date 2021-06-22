import { useEffect, useState } from 'react';
import localForage from 'localforage';
import { GetQuoteDetails_quoteByCapId as IQuote } from '../../generated/GetQuoteDetails';

export default function useGetQuote(): IQuote | null {
  const [quote, setQuote] = useState<IQuote | null>(null);
  useEffect(() => {
    const getQuote = async () => {
      const storedQuote = await localForage.getItem<IQuote>('quote');

      if (storedQuote) {
        setQuote(storedQuote);
      }
    };

    getQuote();
  }, []);
  return quote;
}
