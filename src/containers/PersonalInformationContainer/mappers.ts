import { IAddressPerson } from './interfaces';
import {
  IPersonInformationFormValues,
  IPropsPersonFormValues,
} from '../../components/PersonalInformation/interface';

const addressParser = (
  address: IAddressPerson | undefined,
  addressId: string | undefined,
) => {
  const addressLines = address?.label?.split('-')[0]?.split(',');
  const addressCityData = address?.label?.split('-')[1]?.split(',');
  const country = address?.id?.split('|')[0].trim() || null;

  return {
    uuid: addressId || null,
    kind: 'Home',
    serviceId: address?.id?.trim() || null,
    lineOne: addressLines ? addressLines[0]?.trim() : null,
    lineTwo: addressLines ? addressLines[1]?.trim() : null,
    lineThree: addressLines ? addressLines[2]?.trim() : null,
    city: addressCityData ? addressCityData[0]?.trim() : null,
    postcode: addressCityData ? addressCityData[1]?.trim() : null,
    country,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IPersonInformationFormValues,
  person: IPropsPersonFormValues,
  address: IAddressPerson | undefined,
  addressId: string | undefined,
) => {
  const email = person?.emailAddresses?.find(_ => _.primary)?.value;

  return {
    uuid: person.uuid,
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddress: {
      value: email || '',
      primary: true,
    },
    telephoneNumber: {
      value: values.mobile,
      primary: true,
    },
    address: addressParser(address, addressId),
  };
};
