import moment from 'moment';
import {
  historyToMoment,
  THistoryEntry,
  historyToDate,
} from '../../utils/dates';

export function calculateRemainingMonths(
  entries: THistoryEntry[],
  required: number,
) {
  const completed = entries.filter(x => x.month && x.year).map(historyToMoment);
  if (completed.length === 0) {
    // None are completed so we still need the required months
    return required;
  }

  const earliest = moment.min(...completed);
  const diff = moment().diff(earliest, 'months');
  return Math.max(required - diff, 0);
}

export function getExtraneousIndices(
  entries: THistoryEntry[],
  required: number,
) {
  const threshold = moment()
    .subtract(required, 'months')
    .day(1);

  // Find the first entry that satisfies the minimum number of months
  const lastValidIndex = entries
    .filter(x => x.month && x.year)
    .map(historyToMoment)
    .findIndex(x => x.isBefore(threshold));

  // Make sure there is at least one valid date
  if (lastValidIndex === -1) {
    return [];
  }

  return entries
    .map((_, index) => index)
    .filter(index => index > lastValidIndex);
}

export function getUnorderedIndices(entries: THistoryEntry[]) {
  const dates = entries.filter(x => x.month && x.year).map(historyToDate);

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
}
