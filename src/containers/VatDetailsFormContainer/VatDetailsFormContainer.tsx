import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import VatDetailsForm from '../../components/VatDetailsForm/VatDetailsForm';
import { VatDetailsFormValues } from '../../components/VatDetailsForm/interfaces';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import {
  useUpdateLimitedVatDetails,
  useUpdateSoleTraderVatDetails,
} from './gql';
import { IVatDetailsFormContainerProps } from './interfaces';
import { mapFormValues, mapDefaultValues } from './mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
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
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderId,
  );
  const defaultValues = mapDefaultValues(
    getCreditApplicationByOrderUuidQuery.data?.creditApplicationByOrderUuid,
  );

  const handleCreditApplicationUpdate = (vatDetails: VatDetailsFormValues) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          vatDetails,
          orderUuid: orderId,
        }),
      },
    });

  const handleVatDetailsUpdate = (values: VatDetailsFormValues) => {
    const input = {
      variables: {
        input: {
          // personUuid:
          companyType: isSoleTrader
            ? CompanyTypes.soleTrader
            : CompanyTypes.limited,
          ...mapFormValues(values, companyUuid),
        },
      },
    };

    return isSoleTrader
      ? updateSoleTraderVatDetails(input)
      : updateLimitedVatDetails(input);
  };

  const handleSubmit = async (values: VatDetailsFormValues) => {
    try {
      await handleVatDetailsUpdate(values);
      await handleCreditApplicationUpdate(values);
      onCompleted();
    } catch (err) {
      onError(err);
    }
  };

  if (getCreditApplicationByOrderUuidQuery.loading) {
    return <Loading size="large" />;
  }

  if (getCreditApplicationByOrderUuidQuery?.error) {
    return (
      <p>{`Could not load VAT details: ${getCreditApplicationByOrderUuidQuery?.error.message}`}</p>
    );
  }

  return (
    <VatDetailsForm
      onSubmit={handleSubmit}
      vatDetails={defaultValues}
      isEdited={isEdited}
    />
  );
};

export default VatDetailsFormContainer;
