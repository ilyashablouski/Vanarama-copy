import { useMemo } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  calculateExtraneousEntries,
  calculateRemainingMonths,
  calculateUnorderedEntries,
  THistoryEntry,
} from '../utils/dates';

type Actions = {
  onAppend: () => void;
  onRemove: (index: number) => void;
  onSwap: (indexA: number, indexB: number) => void;
};

export default function useHistory<T extends THistoryEntry>(
  entries: T[],
  requiredMonths: number,
  actions: Actions,
) {
  const remainingMonths = useMemo(
    () => calculateRemainingMonths(entries, requiredMonths),
    [entries, requiredMonths],
  );

  useDeepCompareEffect(() => {
    const allDatesCompleted = entries.every(date => date.month && date.year);
    if (allDatesCompleted && remainingMonths) {
      actions.onAppend();
      return;
    }

    const extraneous = calculateExtraneousEntries(entries, requiredMonths);
    if (extraneous.length) {
      actions.onRemove(extraneous[0]);
      return;
    }

    const unordered = calculateUnorderedEntries(entries);
    if (unordered.length) {
      actions.onSwap(unordered[0][0], unordered[0][1]);
    }
  }, [actions, entries, remainingMonths, requiredMonths]);

  return { remainingMonths };
}
