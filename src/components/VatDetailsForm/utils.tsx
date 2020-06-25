import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { hasDuplicates, sum } from '../../utils/array';
import { VatDetailsFormValues as FormValues } from './interfaces';

const DUPLICATE_ERROR = 'You cannot select the same country more than once';
const MAX_ERROR = 'The Total % of Turnover Cannot Exceed 100%';
const MIN_ERROR = 'The % of turnover must be at least 1%';
const REQUIRED_ERROR = 'Please fill in country of trade and % of turnover';

export function useTurnoverErrorMessage() {
  const { errors } = useFormContext<FormValues>();
  const validErrors = errors.markets?.filter(Boolean) || [];

  const isMissing = validErrors.find(
    _ => _.country?.type === 'required' || _.percentage?.type === 'required',
  );

  if (isMissing) {
    return REQUIRED_ERROR;
  }

  const isTooLow = validErrors.find(_ => _.percentage?.type === 'min');
  if (isTooLow) {
    return MIN_ERROR;
  }

  const isTooHigh = validErrors.find(_ => _.percentage?.type === 'max');
  if (isTooHigh) {
    return MAX_ERROR;
  }

  return errors.isValid?.message?.toString();
}

export function useCustomValidation() {
  const { triggerValidation, register, watch } = useFormContext<FormValues>();

  const markets = watch('markets');
  const validateMarkets = useCallback(() => {
    const countries = markets.map(_ => _.country).filter(Boolean);
    if (hasDuplicates(countries)) {
      return DUPLICATE_ERROR;
    }

    const total = sum(markets, _ => parseInt(_.percentage, 10));
    return total > 100 ? MAX_ERROR : undefined;
  }, [markets]);

  // Register the "virtual" field that holds the validation state
  useEffect(() => {
    register('isValid', { validate: validateMarkets });
  }, [register, validateMarkets]);

  // Validate each time the markets change
  useEffect(() => {
    triggerValidation('isValid');
  }, [markets, triggerValidation]);
}
