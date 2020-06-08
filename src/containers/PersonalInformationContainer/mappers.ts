import { IAddressPerson, IProps } from './interfaces';
import {
  IPersonInformationFormValues,
  IPropsPersonFormValues,
} from '../../components/PersonalInformation/interface';

const addressParser = (address: IAddressPerson) => {
  const addressLines = address?.label?.split('-')[0]?.split(',');
  const addressCityData = address?.label?.split('-')[1]?.split(',');
  const country = address?.id?.split('|')[0].trim() || '';

  return {
    uuid: address.uuid,
    kind: 'Home',
    serviceId: address?.id?.trim(),
    lineOne: addressLines ? addressLines[0]?.trim() : '',
    lineTwo: addressLines ? addressLines[1]?.trim() : '',
    lineThree: addressLines ? addressLines[2]?.trim() : '',
    city: addressCityData ? addressCityData[0]?.trim() : '',
    postcode: addressCityData ? addressCityData[1]?.trim() : '',
    country,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IPersonInformationFormValues,
  person: IPropsPersonFormValues,
  address: IAddressPerson,
) => {
  const email = person?.emailAddresses?.find(_ => _.primary).value;

  return {
    uuid: person.uuid,
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddress: {
      value: email,
      primary: true,
    },
    telephoneNumber: {
      value: values.mobile,
      primary: true,
    },
    address: addressParser(address),
  };
};
