import { client } from '../../lib/apollo';
import { ALL_DROPDOWNS, CREATE_UPDATE_PERSON } from '.';

export const allDropdownData = async () => {
  return client.query({
    query: ALL_DROPDOWNS,
  });
};

export const createUpdatePerson = async (values) => {
  const result = await client.mutate({
    mutation: CREATE_UPDATE_PERSON,
    variables: { ...values },
  });
  console.log(result);
};
