import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useUpdateBankDetails, useBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useBankDetails(companyUuid);
  const [updateBankDetails] = useUpdateBankDetails(companyUuid, onCompleted);
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderUuid,
    () => {},
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.companyByUuid) {
    return null;
  }

  const { bankAccounts } = data.companyByUuid;
  const currentAccount =
    (bankAccounts?.length &&
      bankAccounts.reduce((prev, current) => {
        return new Date(prev.updatedAt).getTime() >
          new Date(current.updatedAt).getTime()
          ? prev
          : current;
      })) ||
    undefined;

  return (
    <CompanyBankDetails
      account={currentAccount}
      onSubmit={async values =>
        updateBankDetails({
          variables: {
            input: formValuesToInput(companyUuid, values, currentAccount?.uuid),
          },
        }).then(() =>
          createUpdateApplication({
            variables: {
              input: {
                orderUuid,
              },
            },
          }),
        )
      }
    />
  );
};

export default CompanyBankDetailsFormContainer;
