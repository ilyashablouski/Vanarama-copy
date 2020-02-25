import { client } from '../apollo';
import { ALL_DROPDOWNS, CREATE_UPDATE_PERSON } from './gql';
import { IDetails } from '../../components/Olaf/AboutForm/interface';
import moment from 'moment';

export const allDropdownData = async () => {
  return client.query({
    query: ALL_DROPDOWNS,
  });
};

export const createUpdatePerson = async (details: IDetails) => {
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
  const dob = moment(dateStr, 'DD-MMMM-YYYY').format(
    'DD-MM-YY',
  );

  console.log(dob)

  return client.mutate({
    mutation: CREATE_UPDATE_PERSON,
    variables: {
      title: title,
      mstatus: maritalStatus,
      fname: firstName,
      lname: lastName,
      consent: consent,
      dob: dob,
      email: email,
      phone: mobile,
    },
  });
};
