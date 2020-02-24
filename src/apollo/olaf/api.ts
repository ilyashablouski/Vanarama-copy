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

  const dob = moment(`${dayOfBirth}-${monthOfBirth}-${yearOfBirth}`).format(
    'DD-MM-YY',
  );

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
