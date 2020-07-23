import React from 'react';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { ISoleTraderCompanyDetailsFormContainerProps } from './interfaces';

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  onCompleted,
}) => {
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    onCompleted,
  );

  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  return (
    <CompanyDetailsForm
      onSubmit={async values => {
        await createUpdateApplication({
          variables: {
            input: {
              ...creditApplication.data?.creditApplicationByOrderUuid,
              addresses: [
                {
                  serviceId: values.tradingAddress.id,
                  label: values.tradingAddress.label,
                },
              ],
              orderUuid: orderId,
              emailAddresses: [
                {
                  value: values.email,
                },
              ],
              telephoneNumbers: [
                {
                  value: values.businessTelephoneNumber,
                },
              ],
              // bankAccounts: [],
              // incomeAndExpenses: [],
            },
          },
        });
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
