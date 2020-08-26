import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import CompanyBankDetails from '../../components/CompanyBankDetails';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { useUpdateBankDetails } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput, mapDefaultValues } from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';

const CompanyBankDetailsFormContainer: React.FC<IProps> = ({
  companyUuid,
  orderUuid,
  onCompleted,
  isEdited,
}) => {
  const [updateBankDetails] = useUpdateBankDetails(companyUuid, onCompleted);
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderUuid,
    () => {},
  );
  const { loading, error, data } = useGetCreditApplicationByOrderUuid(
    orderUuid,
  );
  const account = mapDefaultValues(data?.creditApplicationByOrderUuid);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <CompanyBankDetails
      isEdited={isEdited}
      account={account}
      onSubmit={async values => {
        const input = formValuesToInput(companyUuid, values);

        await updateBankDetails({
          variables: {
            input,
          },
        }).then(() =>
          createUpdateApplication({
            variables: {
              input: formValuesToInputCreditApplication({
                ...data?.creditApplicationByOrderUuid,
                bankAccounts: [values],
                orderUuid,
              }),
            },
          }),
        );
      }}
    />
  );
};

export default CompanyBankDetailsFormContainer;
