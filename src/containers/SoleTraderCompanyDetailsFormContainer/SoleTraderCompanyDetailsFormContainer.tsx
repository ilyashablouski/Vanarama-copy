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
      onSubmit={async () => {
        await createUpdateApplication({
          variables: {
            input: {
              ...creditApplication.data?.creditApplicationByOrderUuid,
              orderUuid: orderId,
            },
          },
        });
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
