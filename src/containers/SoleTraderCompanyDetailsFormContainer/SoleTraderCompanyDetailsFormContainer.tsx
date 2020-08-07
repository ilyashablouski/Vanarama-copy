import React from 'react';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { ISoleTraderCompanyDetailsFormContainerProps } from './interfaces';

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  onCompleted,
}) => {
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    onCompleted,
  );

  return (
    <CompanyDetailsForm
      onSubmit={async () => {
        await createUpdateApplication({
          variables: {
            input: {
              orderUuid: orderId,
            },
          },
        });
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
