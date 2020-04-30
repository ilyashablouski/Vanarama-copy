import { gql } from 'apollo-boost';
import { NextPage } from 'next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/OlafContainer';
import withApollo from '../../../hocs/withApollo';
import BankDetails from '../../../components/BankDetails';
import {
  CreateUpdateBankAccountMutation as Mutation,
  CreateUpdateBankAccountMutationVariables as MutationVariables,
} from '../../../../generated/CreateUpdateBankAccountMutation';
import {
  GetBankDetailsPageDataQuery as Query,
  GetBankDetailsPageDataQueryVariables as QueryVariables,
} from '../../../../generated/GetBankDetailsPageDataQuery';

export const CREATE_UPDATE_BANK_ACCOUNT = gql`
  mutation CreateUpdateBankAccountMutation($input: BankAccountInputObject) {
    createUpdateBankAccount(input: $input) {
      id
    }
  }
`;

const GET_BANK_DETAILS_PAGE_DATA = gql`
  query GetBankDetailsPageDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      uuid
      partyId
    }
  }
`;

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const personUuid = router.query.id as string;
  const { loading, error, data } = useQuery<Query, QueryVariables>(
    GET_BANK_DETAILS_PAGE_DATA,
    {
      variables: { uuid: personUuid },
    },
  );

  const [bankDetails] = useMutation<Mutation, MutationVariables>(
    CREATE_UPDATE_BANK_ACCOUNT,
    {
      onCompleted: () => {
        const url = '/olaf/summary';
        router.push(`${url}/[id]`, `${url}/${personUuid}`);
      },
    },
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  return (
    <OlafContainer activeStep={5}>
      <BankDetails
        onSubmit={async values => {
          const joiningDate = `${values.openingMonth} ${values.openingYear}`;
          const joiningDateFormatted = moment(
            joiningDate,
            'DD-MMMM-YYYY',
          ).format('YYYY-MM-DD');

          await bankDetails({
            variables: {
              input: {
                partyId: data?.personByUuid!.partyId,
                accountName: values.nameOnTheAccount,
                accountNumber: values.accountNumber,
                sortCode: values.sortCode?.join(''),
                bankName: values.bankName,
                joinedAt: joiningDateFormatted,
              },
            },
          });
        }}
      />
    </OlafContainer>
  );
};

export default withApollo(BankDetailsPage, { getDataFromTree });
