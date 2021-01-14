import { QuickCreditCheckerInputObject } from '../../../generated/globalTypes';
import { IYourEligiblityCheckerValues } from '../../components/EligibilityChecker/YourEligibilityChecker/interface';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IYourEligiblityCheckerValues,
): QuickCreditCheckerInputObject => ({
  person: {
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: `${values.yearOfBirth}-${values.monthOfBirth}-${values.dayOfBirth}`,
  },
  emailAddress: { kind: 'Home', value: values.email, primary: true },
  addressServiceId: values.addressFinder?.id ? values.addressFinder?.id : '',
});
