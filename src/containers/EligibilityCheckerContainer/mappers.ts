import moment from 'moment';
import { QuickCreditCheckerInputObject } from '../../../generated/globalTypes';
import { IYourEligiblityCheckerValues } from '../../components/EligibilityChecker/YourEligibilityChecker/interface';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IYourEligiblityCheckerValues,
): QuickCreditCheckerInputObject => {
  const dateOfBirth = moment(
    `${values.dayOfBirth}-${values.monthOfBirth}-${values.yearOfBirth}`,
    'DD-MM-YYYY',
  ).format('YYYY-MM-DD');

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
