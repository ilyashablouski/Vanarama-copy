import Text from '@vanarama/uibook/lib/components/atoms/text';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import useHistoryFieldArray from '../../hooks/useHistoryFieldArray';
import useRemainingMonths from '../../hooks/useRemainingMonths';
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

  const { history } = watch({ nest: true });
  const remainingMonths = useRemainingMonths(history, requiredMonths);

  useHistoryFieldArray({
    onAppend: () => {
      append(initialState);
    },
    onRemove: indices => {
      remove(indices);
    },
    onSwap: (indexA, indexB) => {
      swap(indexA, indexB);
    },
    requiredMonths,
    values: history,
  });

  return (
    <>
      {fields.map((field, index) => {
        const isLastEntry = index === fields.length - 1;
        const hasMultipleEntries = fields.length > 1;
        const showMessage =
          isLastEntry && remainingMonths > 0 && hasMultipleEntries;

        return (
          <React.Fragment key={field.id}>
            {showMessage && (
              <Text tag="span" size="regular" color="darker">
                {messageFormat.replace('%s', String(remainingMonths))}
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
