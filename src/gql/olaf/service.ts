import { client } from '../../lib/apollo';
import { GET_DROPDOWN_DATA, POST_ABOUT } from '../../gql/olaf';

export const getDropdownData = async () => {
  return client.query({
    query: GET_DROPDOWN_DATA,
  });
};

export const postAboutData = async (values) => {
  const result = await client.mutate({
    mutation: POST_ABOUT,
    variables: { ...values },
  });
};
