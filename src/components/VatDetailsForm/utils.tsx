import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { VatDetailsFormValues as FormValues } from './interfaces';

export function useTurnoverErrorMessage() {
  const { errors } = useFormContext<FormValues>();
  const validEntries = errors.trade?.filter(Boolean) || [];

  const isMissing = validEntries.find(
    _ => _.country?.type === 'required' || _.percentage?.type === 'required',
  );

  if (isMissing) {
    return 'Please fill in country of trade and % of turnover';
  }

  const isTooLow = validEntries.find(_ => _.percentage?.type === 'min');
  if (isTooLow) {
    return 'The % of turnover must be at least 1%';
  }

  const isTooHigh = validEntries.find(_ => _.percentage?.type === 'max');
  if (isTooHigh) {
    return 'The Total % of Turnover Cannot Exceed 100%';
  }

  return errors.isValidTotal?.message?.toString();
}

/**
 * A simple custom hook that handles the validation logic for the total turnover percentage
 */
export function useTotalPercentageValidation() {
  const { triggerValidation, register, watch } = useFormContext<FormValues>();
  const trade = watch('trade');

  const validate = useCallback(() => {
    const total = trade.reduce((sum, _) => sum + parseInt(_.percentage, 10), 0);
    return total > 100
      ? 'The Total % of Turnover Cannot Exceed 100%'
      : undefined;
  }, [trade]);

  useEffect(() => {
    register('isValidTotal', { validate });
  }, [register, validate]);

  useEffect(() => {
    triggerValidation('isValidTotal');
  }, [trade, triggerValidation]);
}
