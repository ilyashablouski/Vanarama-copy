import useDeepCompareEffect from 'use-deep-compare-effect';
import { THistoryEntry } from '../utils/dates';
import useExtraneousHistoryEntries from './useExtraneousHistoryEntries';
import useRemainingMonths from './useRemainingMonths';
import useUnorderedHistoryEntries from './useUnorderedHistoryEntries';

interface Options {
  requiredMonths: number;
  values: THistoryEntry[];
  onAppend: () => void;
  onRemove: (index: number[]) => void;
  onSwap: (indexA: number, indexB: number) => void;
}

export default function useHistoryFieldArray(options: Options) {
  const { onAppend, onRemove, onSwap, requiredMonths, values } = options;

  const remainingMonths = useRemainingMonths(values, requiredMonths);
  useDeepCompareEffect(() => {
    const allDatesCompleted = values.every(x => x.month && x.year);
    if (allDatesCompleted && remainingMonths) {
      onAppend();
    }
  }, [remainingMonths, values]);

  const extraneous = useExtraneousHistoryEntries(values, requiredMonths);
  useDeepCompareEffect(() => {
    if (extraneous.length) {
      onRemove(extraneous);
    }
  }, [extraneous]);

  const unordered = useUnorderedHistoryEntries(values);
  useDeepCompareEffect(() => {
    if (unordered.length) {
      onSwap(unordered[0][0], unordered[0][1]);
    }
  }, [unordered]);
}
