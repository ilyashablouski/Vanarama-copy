import moment from 'moment';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { historyToMoment, THistoryEntry } from '../utils/dates';

export default function useExtraneousHistories<T extends THistoryEntry>(
  requiredMonths: number,
  histories: T[],
) {
  const [extraneous, setExtraneous] = useState([]);

  useDeepCompareEffect(() => {
    const threshold = moment()
      .subtract(requiredMonths, 'months')
      .day(1);

    // Find the first entry that satisfies the minimum number of months
    const lastValidIndex = histories
      .filter(x => x.month && x.year)
      .map(historyToMoment)
      .findIndex(x => x.isBefore(threshold));

    // Make sure there is at least one valid date
    if (lastValidIndex === -1) {
      setExtraneous([]);
    } else {
      const indices = histories
        .map((_, index) => index)
        .filter(index => index > lastValidIndex);

      setExtraneous(indices);
    }
  }, [histories, requiredMonths]);

  return extraneous;
}
