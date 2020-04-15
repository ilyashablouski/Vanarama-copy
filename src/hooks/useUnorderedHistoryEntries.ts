import { useMemo } from 'react';
import { historyToDate, THistoryEntry } from '../utils/dates';

export default function useUnorderedHistoryEntries(values: THistoryEntry[]) {
  const unordered = useMemo(() => {
    const dates = values.filter(x => x.month && x.year).map(historyToDate);

    // Don't actually sort the array, just maintain a list of indices we need to swap
    const swapIndices: [number, number][] = [];
    dates.sort((a, b) => {
      const diff = b.getTime() - a.getTime();
      if (diff < 0) {
        swapIndices.push([dates.indexOf(a), dates.indexOf(b)]);
      }

      return 0;
    });

    return swapIndices;
  }, [values]);

  return unordered;
}
