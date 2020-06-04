import { PersonInputObject } from '../../../generated/globalTypes';
import { IPersonalInformationValues } from '../../components/PersonalInformation/interface';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IPersonalInformationValues,
): PersonInputObject => {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddress: { kind: 'Home', value: values.email, primary: true },
    telephoneNumber: { kind: 'Mobile', value: values.mobile, primary: true },
    emailConsent: values.consent,
  };
};
