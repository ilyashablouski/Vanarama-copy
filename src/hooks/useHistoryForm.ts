import { useFieldArray, useForm, UseFormOptions } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { THistoryEntry } from '../utils/dates';
import useExtraneousHistories from './useExtraneousHistories';
import useRemainingMonths from './useRemainingMonths';
import useUnorderedHistories from './useUnorderedHistories';

const DEFAULT_REQUIRED_MONTHS = 36;

type Options<V> = UseFormOptions<V> & { requiredMonths?: number };

interface WithHistory {
  history: THistoryEntry[];
}

/**
 * A wrapper around `useForm` that handles the logic for adding and removing
 * multiple entries for forms such as Address/Employment history.
 * @param options Options to pass to useForm
 */
export default function useHistoryForm<V extends WithHistory>(
  options: Options<V>,
) {
  const {
    requiredMonths = DEFAULT_REQUIRED_MONTHS,
    ...useFormOptions
  } = options;

  // Set up React Hook Form
  const methods = useForm(useFormOptions);
  const { append, fields, remove, swap } = useFieldArray({
    control: methods.control,
    name: 'history',
  });

  const watchHistory = methods.watch('history');

  // Run our custom hooks
  const remaining = useRemainingMonths(requiredMonths, watchHistory);
  const extraneous = useExtraneousHistories(requiredMonths, watchHistory);
  const unordered = useUnorderedHistories(watchHistory);

  // Adds new fields when required
  useDeepCompareEffect(() => {
    const allDatesFilledIn = watchHistory.every(x => x.month && x.year);
    if (allDatesFilledIn && remaining) {
      append({});
    }
  }, [append, remaining, watchHistory]);

  // Removes unncecessary fields
  useDeepCompareEffect(() => {
    if (extraneous.length) {
      // Only one array function can be called at a time - see https://react-hook-form.com/api#useFieldArray
      remove(extraneous[0]);
    }
  }, [extraneous, remove]);

  // Swaps fields into their correct orders
  useDeepCompareEffect(() => {
    if (unordered.length) {
      // Only one array function can be called at a time - see https://react-hook-form.com/api#useFieldArray
      swap(unordered[0][0], unordered[0][1]);
    }
  }, [unordered, swap]);

  return { fields, ...methods, remaining };
}
