import { apolloClient as client } from '../apolloClient';
import { ALL_DROPDOWNS, CREATE_UPDATE_PERSON } from './gql';
import { IDetails } from '../../../components/olaf/about-form/interface';
import moment from 'moment';

export const allDropdownData = async () => {
  const { data } = await client.query({
    query: ALL_DROPDOWNS,
  });
  const { allDropDowns } = data;
  return allDropDowns;
};

export const createUpdatePerson = (details: IDetails) => {
  const {
    title,
    firstName,
    lastName,
    email,
    mobile,
    dayOfBirth,
    monthOfBirth,
    yearOfBirth,
    countryOfBirth,
    nationality,
    maritalStatus,
    dependants,
    adultsInHousehold,
    consent,
    termsAndCons,
  } = details;

  const dateStr = `${dayOfBirth} ${monthOfBirth} ${yearOfBirth}`;
  const dob = moment(dateStr, 'DD-MMMM-YYYY').format('DD-MM-YY');

  return client.mutate({
    mutation: CREATE_UPDATE_PERSON,
    variables: {
      title,
      mstatus: maritalStatus,
      fname: firstName,
      lname: lastName,
      consent,
      dob,
      email,
      phone: mobile,
    },
  });
};
