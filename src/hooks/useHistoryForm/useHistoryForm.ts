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
    name: 'history',
  });

  const values = methods.getValues({ nest: true }).history;
  const remaining = calculateRemainingMonths(values, requiredMonths);

  useDeepCompareEffect(() => {
    // Only one array function can be called at a time - see https://react-hook-form.com/api#useFieldArray
    const allDatesCompleted = values.every(x => x.month && x.year);
    if (allDatesCompleted && remaining) {
      append({});
      return;
    }

    const extraneous = getExtraneousIndices(values, requiredMonths);
    if (extraneous.length) {
      remove(extraneous);
      return;
    }

    const unordered = getUnorderedIndices(values);
    if (unordered.length) {
      swap(unordered[0][0], unordered[0][1]);
    }
    /**
     * NOTE: append, remove, swap are not included here because they change on every render
     * and this causes multiple cards to be appended
     */
  }, [values, remaining, requiredMonths]);

  return { fields, ...methods, remaining };
}
