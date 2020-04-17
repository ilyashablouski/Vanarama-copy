import moment from 'moment';
import { useMemo } from 'react';
import { historyToMoment, THistoryEntry } from '../utils/dates';

export default function useExtraneousHistoryEntries(
  values: THistoryEntry[],
  required: number,
) {
  const extraneous = useMemo(() => {
    const threshold = moment()
      .subtract(required, 'months')
      .day(1);

    // Find the first entry that satisfies the minimum number of months
    const lastValidIndex = values
      .filter(x => x.month && x.year)
      .map(historyToMoment)
      .findIndex(x => x.isBefore(threshold));

    // Make sure there is at least one valid date
    if (lastValidIndex === -1) {
      return [];
    }

    return values
      .map((_, index) => index)
      .filter(index => index > lastValidIndex);
  }, [required, values]);

  return extraneous;
}
