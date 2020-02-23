import { client } from '../apollo';
import { ALL_DROPDOWNS, CREATE_UPDATE_PERSON } from './gql';

export const allDropdownData = async () => {
  return client.query({
    query: ALL_DROPDOWNS,
  });
};

/**todo specify vars */
export const createUpdatePerson = async (details) => {
  const result = await client.mutate({
    mutation: CREATE_UPDATE_PERSON,
    variables: { ...details },
  });
  console.log(result);
};
