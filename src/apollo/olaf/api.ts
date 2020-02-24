import { client } from '../apollo';
import { ALL_DROPDOWNS, CREATE_UPDATE_PERSON } from './gql';
import { IDetails } from '../../components/Olaf/AboutForm/interface';

export const allDropdownData = async () => {
  return client.query({
    query: ALL_DROPDOWNS,
  });
};

/* >>> todo specify vars <<< */
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
  try {
    const result = await client.mutate({
      mutation: CREATE_UPDATE_PERSON,
      variables: {
        title: title,
        mstatus: maritalStatus,
        fname: firstName,
        lname: lastName,
        consent: consent,
        dob: '1988-01-21',
        email: email,
        phone: mobile,
      },
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
