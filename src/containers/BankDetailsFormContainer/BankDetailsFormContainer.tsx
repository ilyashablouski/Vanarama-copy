import React from 'react';
import dynamic from 'next/dynamic';
import { useBankDetails, useUpdateBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const BankDetails = dynamic(() => import('../../components/BankDetails'));
const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const BankDetailsFormContainer: React.FC<IProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useBankDetails(personUuid);
  const [updateBankDetails] = useUpdateBankDetails(personUuid, onCompleted);
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  const { bankAccounts, partyId } = data.personByUuid;
  const firstAccount = bankAccounts?.[0];
  return (
    <BankDetails
      // `PersonType.bankAccount`s is an array, so just take the first one???
      account={firstAccount}
      onSubmit={values =>
        updateBankDetails({
          variables: {
            input: formValuesToInput(partyId, values),
          },
        })
      }
    />
  );
};

export default BankDetailsFormContainer;
