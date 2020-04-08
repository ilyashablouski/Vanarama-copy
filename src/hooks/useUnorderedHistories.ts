import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { historyToDate, THistoryEntry } from '../utils/dates';

export default function useUnorderedHistories<T extends THistoryEntry>(
  histories: T[],
) {
  const [unordered, setUnordered] = useState<[number, number][]>([]);

  useDeepCompareEffect(() => {
    const historyDates = histories
      .filter(x => x.month && x.year)
      .map(historyToDate);

    // Don't actually sort the array, just maintain a list of indices we need to swap
    const swapIndices = [];
    historyDates.sort((a, b) => {
      const diff = b.getTime() - a.getTime();
      if (diff < 0) {
        swapIndices.push([historyDates.indexOf(a), historyDates.indexOf(b)]);
      }

      return 0;
    });

    setUnordered(swapIndices);
  }, [histories]);

  return unordered;
}
