import moment from 'moment';
import { useMemo } from 'react';
import { historyToMoment, THistoryEntry } from '../utils/dates';

export default function useRemainingMonths(
  values: THistoryEntry[],
  required: number,
) {
  const remaining = useMemo(() => {
    const completed = values
      .filter(x => x.month && x.year)
      .map(historyToMoment);

    if (completed.length === 0) {
      // None are completed so we still need the required months
      return required;
    }

    const earliest = moment.min(...completed);
    const diff = moment().diff(earliest, 'months');
    return Math.max(required - diff, 0);
  }, [required, values]);

  return remaining;
}
