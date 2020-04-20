import Text from '@vanarama/uibook/lib/components/atoms/text';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import useExtraneousHistoryEntries from '../../hooks/useExtraneousHistoryEntries';
import useRemainingMonths from '../../hooks/useRemainingMonths';
import useUnorderedHistoryEntries from '../../hooks/useUnorderedHistoryEntries';
import { THistoryEntry, toYearsAndMonthsDisplay } from '../../utils/dates';
import { IHistoryFieldArrayProps, WithHistory } from './interfaces';

function HistoryFieldArray<V extends WithHistory>({
  children,
  messageFormat,
  requiredMonths,
  initialState,
}: IHistoryFieldArrayProps<V>) {
  const { control, watch } = useFormContext<V>();
  const { append, fields, remove, swap } = useFieldArray({
    control,
    name: 'history',
  });

  // This is a hack to make `watch` work with `useFieldArray`
  // see: https://github.com/react-hook-form/react-hook-form/issues/1336
  const [history, setHistory] = useState<THistoryEntry[]>(() =>
    watch('history'),
  );

  useEffect(() => {
    setHistory(watch('history'));
  }, [watch]);

  const remainingMonths = useRemainingMonths(history, requiredMonths);
  useDeepCompareEffect(() => {
    const allDatesCompleted = history.every(x => x.month && x.year);
    if (allDatesCompleted && remainingMonths) {
      append(initialState);
    }
  }, [remainingMonths, history]);

  const extraneous = useExtraneousHistoryEntries(history, requiredMonths);
  useDeepCompareEffect(() => {
    if (extraneous.length) {
      remove(extraneous);
    }
  }, [extraneous]);

  const unordered = useUnorderedHistoryEntries(history);
  useDeepCompareEffect(() => {
    if (unordered.length) {
      swap(unordered[0][0], unordered[0][1]);
    }
  }, [unordered]);

  // NOTE: Sometimes `fields` has `undefined` entries so strip them out
  const validFields = fields.filter(Boolean);
  return (
    <>
      {validFields.map((field, index) => {
        const isLastEntry = index === validFields.length - 1;
        const hasMultipleEntries = validFields.length > 1;
        const showMessage =
          isLastEntry && remainingMonths > 0 && hasMultipleEntries;

        return (
          <React.Fragment key={field.id}>
            {showMessage && (
              <Text tag="span" size="regular" color="darker">
                {messageFormat.replace(
                  '%s',
                  toYearsAndMonthsDisplay(remainingMonths),
                )}
              </Text>
            )}
            {children(field, index)}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default HistoryFieldArray;
