import { useFieldArray, useForm } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Options, WithHistory } from './interfaces';
import {
  calculateRemainingMonths,
  getExtraneousIndices,
  getUnorderedIndices,
} from './utils';

/**
 * A wrapper around `useForm` that handles the logic for automatically adding, removing and swapping
 * entries for forms that require a history of information.
 * @param options Options to pass to useForm
 */
export default function useHistoryForm<V extends WithHistory>(
  options: Options<V>,
) {
  const { requiredMonths, ...useFormOptions } = options;

  // Set up React Hook Form
  const methods = useForm(useFormOptions);
  const { append, fields, remove, swap } = useFieldArray({
    control: methods.control,
    name: options.fieldArrayKey,
  });

  const watchHistory = methods.watch('history');
  const remaining = calculateRemainingMonths(watchHistory, requiredMonths);

  useDeepCompareEffect(() => {
    // Only one array function can be called at a time - see https://react-hook-form.com/api#useFieldArray
    const allDatesCompleted = watchHistory.every(x => x.month && x.year);
    if (allDatesCompleted && remaining) {
      append({});
      return;
    }

    const extraneous = getExtraneousIndices(watchHistory, requiredMonths);
    if (extraneous.length) {
      remove(extraneous);
      return;
    }

    const unordered = getUnorderedIndices(watchHistory);
    if (unordered.length) {
      // Only one array function can be called at a time - see https://react-hook-form.com/api#useFieldArray
      swap(unordered[0][0], unordered[0][1]);
    }
  }, [watchHistory, remaining, requiredMonths, append, remove, swap]);

  return { fields, ...methods, remaining };
}
