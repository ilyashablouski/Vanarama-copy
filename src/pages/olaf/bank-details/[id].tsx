import { gql } from 'apollo-boost';
import { NextPage } from 'next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/olaf/olaf-container';
import withApollo from '../../../hocs/withApollo';
import BankDetails from '../../../components/olaf/bank-details';
import {
  CreateUpdateBankAccountMutation,
  CreateUpdateBankAccountMutationVariables,
} from '../../../../generated/CreateUpdateBankAccountMutation';
import {
  GetBankDetailsPageData,
  GetBankDetailsPageDataVariables,
} from '../../../../generated/GetBankDetailsPageData';

export const CREATE_UPDATE_BANK_ACCOUNT = gql`
  mutation CreateUpdateBankAccountMutation($input: BankAccountInputObject) {
    createUpdateBankAccount(input: $input) {
      id
    }
  }
`;

const GET_BANK_DETAILS_PAGE_DATA = gql`
  query GetBankDetailsPageData($id: ID!) {
    personById(id: $id) {
      id
      partyId
    }
  }
`;

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const personId = router.query.id as string;
  const { data } = useQuery<
    GetBankDetailsPageData,
    GetBankDetailsPageDataVariables
  >(GET_BANK_DETAILS_PAGE_DATA, {
    variables: { id: personId },
  });

  const [bankDetails] = useMutation<
    CreateUpdateBankAccountMutation,
    CreateUpdateBankAccountMutationVariables
  >(CREATE_UPDATE_BANK_ACCOUNT, {
    onCompleted: () => {
      const url = '/olaf/summary';
      router.push(`${url}/[id]`, `${url}/${personId}`);
    },
  });

  if (!data) {
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
                partyId: data?.personById?.partyId!,
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
