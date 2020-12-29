import { QuickCreditCheckerInputObject } from '../../../generated/globalTypes';
import { IYourEligiblityCheckerValues } from '../../components/EligibilityChecker/YourEligibilityChecker/interface';
import { reverseDefaultFormatDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IYourEligiblityCheckerValues,
): QuickCreditCheckerInputObject => {
  const dateOfBirth = reverseDefaultFormatDate(
    new Date(
      `${values.monthOfBirth}-${values.dayOfBirth}-${values.yearOfBirth}`,
    ),
  );

  return {
    person: {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth,
    },
    emailAddress: { kind: 'Home', value: values.email, primary: true },
    addressServiceId: values.addressFinder?.id ? values.addressFinder?.id : '',
  };
};
