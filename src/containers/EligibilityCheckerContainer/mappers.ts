import { QuickCreditCheckerInputObject } from '../../../generated/globalTypes';
import { IYourEligiblityCheckerValues } from '../../components/EligibilityChecker/YourEligibilityChecker/interface';
import { parseDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IYourEligiblityCheckerValues,
): QuickCreditCheckerInputObject => ({
  person: {
    firstName: values.firstName,
    lastName: values.lastName,
    dateOfBirth: parseDate(
      values.dayOfBirth,
      values.monthOfBirth,
      values.yearOfBirth,
    ),
    termsAndConditions: Boolean(values.termsAndCons),
    privacyPolicy: Boolean(values.privacyPolicy),
    emailConsent: Boolean(values.consent),
  },
  emailAddress: { kind: 'Home', value: values.email, primary: true },
  addressServiceId: values.addressFinder?.id ?? '',
  address: {
    serviceId: values.addressFinder?.id,
  },
});
