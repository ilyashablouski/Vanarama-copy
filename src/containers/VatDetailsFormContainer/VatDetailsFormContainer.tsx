import dynamic from 'next/dynamic';
import React from 'react';
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
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});

export const VatDetailsFormContainer: React.FC<IVatDetailsFormContainerProps> = ({
  companyUuid,
  orderId,
  onCompleted,
  onError,
  isEdited,
  isSoleTrader,
  personUuid,
}) => {
  const [updateLimitedVatDetails] = useUpdateLimitedVatDetails();
  const [updateSoleTraderVatDetails] = useUpdateSoleTraderVatDetails();
  const [createUpdateApplication] = useCreateUpdateCreditApplication();
  const { loading, error, data } = useGetCreditApplicationByOrderUuid(orderId);
  const defaultValues = mapDefaultValues(data?.creditApplicationByOrderUuid);

  const handleCreditApplicationUpdate = (vatDetails: VatDetailsFormValues) =>
    createUpdateApplication({
      variables: {
        input: {
          vatDetails,
          orderUuid: orderId,
        },
      },
    });

  const handleVatDetailsUpdate = (values: VatDetailsFormValues) => {
    const input = {
      variables: {
        input: {
          person: {
            uuid: personUuid,
          },
          companyNature:
            data?.creditApplicationByOrderUuid?.companyDetailsV2
              ?.natureOfBusiness ?? '',
          companyType: isSoleTrader
            ? CompanyTypes.soleTrader
            : CompanyTypes.limited,
          ...mapFormValues(companyUuid, values),
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

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>{`Could not load VAT details: ${error.message}`}</p>;
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
