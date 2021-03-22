import { IDrivingLicence } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseBlinkIdToInitialFormValues = (
  drivingLicence: IDrivingLicence,
) => {
  const birthData = drivingLicence.birthData
    .split(' ')[0]
    .split('.')
    .reverse()
    .join('/');
  const dateOfBirth = drivingLicence?.birthData && new Date(birthData);

  return {
    firstName: drivingLicence.firstName || '',
    lastName: drivingLicence.lastName || '',
    dayOfBirth: dateOfBirth ? String(dateOfBirth.getDate()) : '',
    monthOfBirth: dateOfBirth ? String(dateOfBirth.getMonth() + 1) : '',
    yearOfBirth: dateOfBirth ? String(dateOfBirth.getFullYear()) : '',
    email: '',
    addressFinder: {
      label: drivingLicence.address,
    },
  };
};
