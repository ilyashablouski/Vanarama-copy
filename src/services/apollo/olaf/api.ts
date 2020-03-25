import moment from 'moment';
import { AllDropDownsQuery } from '../../../../generated/AllDropDownsQuery';
import {
  CreateUpdatePersonMutation,
  CreateUpdatePersonMutationVariables,
} from '../../../../generated/CreateUpdatePersonMutation';
import { IDetails } from '../../../components/olaf/about-form/interface';
import { apolloClient as client } from '../apolloClient';
import { ALL_DROPDOWNS, CREATE_UPDATE_PERSON } from './gql';

export const allDropdownData = async () => {
  const { data } = await client.query<AllDropDownsQuery>({
    query: ALL_DROPDOWNS,
  });

  return data.allDropDowns;
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
    maritalStatus,
    consent,
  } = details;

  const dateStr = `${dayOfBirth} ${monthOfBirth} ${yearOfBirth}`;
  const dob = moment(dateStr, 'DD-MMMM-YYYY').format('DD-MM-YY');

  return client.mutate<
    CreateUpdatePersonMutation,
    CreateUpdatePersonMutationVariables
  >({
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
