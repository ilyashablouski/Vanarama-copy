import moment from 'moment';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { historyToMoment, THistoryEntry } from '../utils/dates';

export default function useRemainingMonths<T extends THistoryEntry>(
  requiredMonths: number,
  histories: T[],
) {
  const [remaining, setRemaining] = useState(requiredMonths);

  useDeepCompareEffect(() => {
    const validEntries = histories
      .filter(x => x.month && x.year)
      .map(historyToMoment);

    if (!validEntries.length) {
      setRemaining(requiredMonths);
    } else {
      const earliest = moment.min(...validEntries);
      const diff = moment().diff(earliest, 'months');
      const updated = Math.max(requiredMonths - diff, 0);
      setRemaining(updated);
    }
  }, [requiredMonths, histories]);

  return remaining;
}
