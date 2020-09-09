/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { ISoleTraderDetailsFormContainerProps } from './interface';
import { ISoleTraderDetailsFormValues } from '../../components/SoleTraderDetailsForm/interfaces';
import { formValuesToInput } from '../../components/SoleTraderDetailsForm/mappers';
import {
  useSoleTraderDetailsFormDataQuery,
  useUpdateSoleTraderMutation,
} from './gql';

const SoleTraderDetailsFormContainer: React.FC<ISoleTraderDetailsFormContainerProps> = ({
  personUuid,
  isEdited,
  onCompleted,
  onError,
}) => {
  const soleTraderDetailsFormData = useSoleTraderDetailsFormDataQuery(
    personUuid,
  );
  const [updateSoleTraderDetails] = useUpdateSoleTraderMutation();

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

  const { addresses, partyId } = soleTraderDetailsFormData.data.personByUuid;

  const handleSoleTraderDetailsSave = (values: ISoleTraderDetailsFormValues) =>
    updateSoleTraderDetails({
      variables: {
        input: { uuid: personUuid, associate: formValuesToInput(values) },
      },
    });

  return (
    <SoleTraderDetailsForm
      addresses={addresses}
      dropdownData={soleTraderDetailsFormData.data!.allDropDowns}
      isEdited={isEdited}
      onSubmit={async values => {
        // console.log(values);
        handleSoleTraderDetailsSave(values)
          .then(onCompleted)
          .catch(onError);
      }}
    />
  );
};

export default SoleTraderDetailsFormContainer;
