import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../gql/creditApplication';
import { ISoleTraderDetailsFormContainerProps } from './interface';
import { ISoleTraderDetailsFormValues } from '../../components/SoleTraderDetailsForm/interfaces';
import { formValuesToAssociate } from '../../components/SoleTraderDetailsForm/mappers';
import { formValuesToInputCreditApplication } from '../../mappers/mappersCreditApplication';
import {
  useSoleTraderDetailsFormDataQuery,
  useUpdateSoleTraderMutation,
} from './gql';

const SoleTraderDetailsFormContainer: React.FC<ISoleTraderDetailsFormContainerProps> = ({
  personUuid,
  companyUuid,
  orderId,
  isEdited,
  onCompleted,
  onError,
}) => {
  const soleTraderDetailsFormData = useSoleTraderDetailsFormDataQuery(
    personUuid,
  );
  const [updateSoleTraderDetails] = useUpdateSoleTraderMutation();
  const [createUpdateApplication] = useCreateUpdateCreditApplication(
    orderId,
    () => {},
  );
  const getCreditApplicationByOrderUuidQuery = useGetCreditApplicationByOrderUuid(
    orderId,
  );

  if (soleTraderDetailsFormData.loading) {
    return <Loading size="large" />;
  }

  if (soleTraderDetailsFormData.error) {
    return <p>Error: {soleTraderDetailsFormData.error.message}</p>;
  }

  if (
    !soleTraderDetailsFormData.data?.allDropDowns ||
    soleTraderDetailsFormData.data?.allDropDowns === null
  ) {
    return null;
  }

  if (
    !soleTraderDetailsFormData.data?.personByUuid?.addresses ||
    soleTraderDetailsFormData.data?.personByUuid.addresses === null
  ) {
    return null;
  }

  const { addresses } = soleTraderDetailsFormData.data.personByUuid;

  const handleSoleTraderDetailsSave = (values: ISoleTraderDetailsFormValues) =>
    updateSoleTraderDetails({
      variables: {
        input: {
          uuid: companyUuid,
          associate: formValuesToAssociate(values, personUuid),
        },
      },
    });

  const handleCreditApplicationUpdate = (
    values: ISoleTraderDetailsFormValues,
  ) =>
    createUpdateApplication({
      variables: {
        input: formValuesToInputCreditApplication({
          ...getCreditApplicationByOrderUuidQuery.data
            ?.creditApplicationByOrderUuid,
          soleTraderDetails: {
            uuid: companyUuid,
            associate: formValuesToAssociate(values, personUuid),
          },
          orderUuid: orderId,
        }),
      },
    });

  return (
    <SoleTraderDetailsForm
      addresses={addresses}
      person={soleTraderDetailsFormData.data!.personByUuid}
      dropdownData={soleTraderDetailsFormData.data!.allDropDowns}
      isEdited={isEdited}
      onSubmit={async values => {
        handleSoleTraderDetailsSave(values)
          .then(() => handleCreditApplicationUpdate(values))
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default SoleTraderDetailsFormContainer;
