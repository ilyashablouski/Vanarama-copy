import moment from 'moment';

export interface THistoryEntry {
  year: string;
  month: string;
}

export const historyToMoment = <T extends THistoryEntry>(history: T) =>
  // NOTE: Default to the first of the month because we don't capture the day
  moment(`1-${history.month}-${history.year}`, 'D-M-YYYY');

export const historyToDate = <T extends THistoryEntry>(history: T) =>
  historyToMoment(history).toDate();

const pluralise = (count: number, config: { one: string; many: string }) => {
  return count === 1 ? config.one : config.many;
};

export const toYearsAndMonthsDisplay = (totalMonths: number) => {
  const absMonths = Math.max(0, totalMonths);
  const years = Math.floor(absMonths / 12);
  const months = absMonths % 12;
  if (years && months) {
    return [
      years,
      pluralise(years, { one: 'year', many: 'years' }),
      'and',
      months,
      pluralise(months, { one: 'month', many: 'months' }),
    ].join(' ');
  }

  if (years) {
    return [years, pluralise(years, { one: 'year', many: 'years' })].join(' ');
  }

  return [months, pluralise(months, { one: 'month', many: 'months' })].join(
    ' ',
  );
};

export function calculateExtraneousEntries(
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

export function calculateUnorderedEntries(entries: THistoryEntry[]) {
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
