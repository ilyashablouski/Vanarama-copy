import React, { useEffect } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import VatDetailsForm from '../../components/VatDetailsForm/VatDetailsForm';
import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useUpdateLimitedVatDetails, useGetVatDetails } from './gql';
import { IVatDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';

export const VatDetailsFormContainer: React.FC<IVatDetailsFormContainerProps> = ({
  companyUuid,
  orderId,
  onCompleted,
  onError,
  isEdited,
}) => {
  const [updateLimitedVatDetails] = useUpdateLimitedVatDetails();
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
    updateLimitedVatDetails({
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

  const [getVatDetails, { data, loading, error }] = useGetVatDetails(
    companyUuid,
  );

  useEffect(() => {
    if (isEdited) {
      getVatDetails();
    }
  }, [getVatDetails, isEdited]);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>{`Could not load VAT details: ${error.message}`}</p>;
  }

  return (
    <VatDetailsForm
      onSubmit={handleSubmit}
      vatDetails={data?.companyByUuid}
      isEdited={isEdited}
    />
  );
};

export default VatDetailsFormContainer;
