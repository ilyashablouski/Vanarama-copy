import { gql } from 'apollo-boost';
import { NextPage } from 'next';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import OlafContainer from '../../../components/olaf/olaf-container';
import withApollo from '../../../hocs/withApollo';
import BankDetails from '../../../components/olaf/bank-details';
import {
  CreateUpdateBankAccountMutation,
  CreateUpdateBankAccountMutationVariables,
} from '../../../../generated/CreateUpdateBankAccountMutation';

export const CREATE_UPDATE_BANK_ACCOUNT = gql`
  mutation CreateUpdateBankAccountMutation($input: BankAccountInputObject) {
    createUpdateBankAccount(input: $input) {
      id
    }
  }
`;

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const partyId = router.query.id as string;
  const [bankDetails] = useMutation<
    CreateUpdateBankAccountMutation,
    CreateUpdateBankAccountMutationVariables
  >(CREATE_UPDATE_BANK_ACCOUNT, {
    onCompleted: () => {
      const url = '/olaf/summary';

      router.push(`${url}/[id]`, `${url}/${partyId}`);
    },
  });

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
                partyId,
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
