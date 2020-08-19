import React, { useEffect } from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import VatDetailsForm from '../../components/VatDetailsForm/VatDetailsForm';
import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';
import { useCreateUpdateCreditApplication } from '../../gql/creditApplication';
import {
  useUpdateLimitedVatDetails,
  useUpdateSoleTraderVatDetails,
  useGetVatDetails,
} from './gql';
import { IVatDetailsFormContainerProps } from './interfaces';
import { mapFormValues } from './mappers';
import { CompanyTypes } from '../../models/enum/CompanyTypes';

export const VatDetailsFormContainer: React.FC<IVatDetailsFormContainerProps> = ({
  companyUuid,
  orderId,
  onCompleted,
  onError,
  isEdited,
  isSoleTrader,
}) => {
  const [updateLimitedVatDetails] = useUpdateLimitedVatDetails();
  const [updateSoleTraderVatDetails] = useUpdateSoleTraderVatDetails();
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

  const handleVatDetailsUpdate = (values: VatDetailsFormValues) => {
    const input = {
      variables: {
        input: {
          companyType: isSoleTrader
            ? CompanyTypes.soleTrader
            : CompanyTypes.limited,
          ...mapFormValues(values, companyUuid),
        },
      },
    };

    return isSoleTrader
      ? updateSoleTraderVatDetails(input).then(
          ({ data }) => data?.createUpdateSoleTraderCompany,
        )
      : updateLimitedVatDetails(input).then(
          ({ data }) => data?.createUpdateLimitedCompany,
        );
  };

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
