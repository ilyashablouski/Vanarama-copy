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
