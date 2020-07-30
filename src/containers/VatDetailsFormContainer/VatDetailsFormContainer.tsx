import React from 'react';
import VatDetailsForm from '../../components/VatDetailsForm/VatDetailsForm';
import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useUpdateVatDetails } from './gql';
import { IVatDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';

export const VatDetailsFormContainer: React.FC<IVatDetailsFormContainerProps> = ({
  companyUuid,
  orderId,
  onCompleted,
  onError,
}) => {
  const [updateVatDetails] = useUpdateVatDetails();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );

  const handleCreditApplicationUpdate = () =>
    createUpdateApplication({
      variables: {
        input: {
          orderUuid: orderId,
        },
      },
    });

  const handleVatDetailsUpdate = (values: VatDetailsFormValues) =>
    updateVatDetails({
      variables: {
        input: mapFormValues(values, companyUuid),
      },
    });

  const handleSubmit = async (values: VatDetailsFormValues) => {
    await handleVatDetailsUpdate(values)
      .then(handleCreditApplicationUpdate)
      .then(onCompleted)
      .catch(onError);
  };

  return <VatDetailsForm onSubmit={handleSubmit} />;
};

export default VatDetailsFormContainer;
