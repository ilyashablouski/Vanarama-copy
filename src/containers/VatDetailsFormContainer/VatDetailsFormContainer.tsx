import React from 'react';
import { useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import VatDetailsForm from '../../components/VatDetailsForm/VatDetailsForm';
import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import { useUpdateVatDetails, GET_VAT_DETAILS } from './gql';
import { IVatDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';
import {
  GetVatDetailsQueryVariables,
  GetVatDetailsQuery,
} from '../../../generated/GetVatDetailsQuery';

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

  const { data, loading, error } = useQuery<
    GetVatDetailsQuery,
    GetVatDetailsQueryVariables
  >(GET_VAT_DETAILS, {
    variables: {
      companyUuid,
    },
  });

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>{`Could not load VAT details: ${error.message}`}</p>;
  }

  return (
    <VatDetailsForm onSubmit={handleSubmit} vatDetails={data?.companyByUuid} />
  );
};

export default VatDetailsFormContainer;
