import React from 'react';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { ISoleTraderCompanyDetailsFormContainerProps } from './interfaces';
import { useUpdateSoleTraderVatDetails } from '../VatDetailsFormContainer/gql';
import { mapFormValues } from './mappers';

const SoleTraderCompanyDetailsFormContainer: React.FC<ISoleTraderCompanyDetailsFormContainerProps> = ({
  orderId,
  onCompleted,
}) => {
  const [updateSoleTraderVatDetails] = useUpdateSoleTraderVatDetails();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    onCompleted,
  );

  const handleCreateApplicationUpdate = () =>
    createUpdateApplication({
      variables: {
        input: {
          orderUuid: orderId,
        },
      },
    });

  return (
    <CompanyDetailsForm
      onSubmit={async values => {
        await updateSoleTraderVatDetails({
          variables: {
            input: mapFormValues(values),
          },
        }).then(() => handleCreateApplicationUpdate());
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
