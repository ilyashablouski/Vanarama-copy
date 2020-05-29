import { IYourEligiblityCheckerValues } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (): IYourEligiblityCheckerValues => {
  return {
    firstName: '',
    lastName: '',
    email: '',
    addressFinder: {},
    promotions: false,
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
  };
};
