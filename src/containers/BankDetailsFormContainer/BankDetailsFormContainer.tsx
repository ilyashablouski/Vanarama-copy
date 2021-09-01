import React from 'react';
import dynamic from 'next/dynamic';
import { useBankDetails, useUpdateBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';
import { useCreatePerson } from '../AboutFormContainer/gql';
import { GetBankDetailsPageDataQuery as IBankDetails } from '../../../generated/GetBankDetailsPageDataQuery';

const BankDetails = dynamic(() => import('../../components/BankDetails'));
const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

const deleteTypenameFromEmailAddress = (bankDetails: IBankDetails) =>
  (bankDetails?.personByUuid?.emailAddresses?.length || 0) > 0
    ? {
        ...bankDetails!.personByUuid!.emailAddresses[0],
        __typename: undefined,
      }
    : undefined;

const BankDetailsFormContainer: React.FC<IProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useBankDetails(personUuid);
  const [createUpdatePerson] = useCreatePerson();
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
        createUpdatePerson({
          variables: {
            input: {
              emailAddress: deleteTypenameFromEmailAddress(data),
              // this fields is required in validation schema so default values is true
              termsAndConditions: values.termsAndConditions || true,
              profilingConsent: values.checkCreditHistory || true,
            },
          },
        }).then(() =>
          updateBankDetails({
            variables: {
              input: formValuesToInput(partyId, values),
            },
          }),
        )
      }
    />
  );
};

export default BankDetailsFormContainer;
