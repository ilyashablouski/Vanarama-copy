/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { ISoleTraderDetailsFormContainerProps } from './interface';
import { useSoleTraderDetailsFormDataQuery } from './gql';

const SoleTraderDetailsFormContainer: React.FC<ISoleTraderDetailsFormContainerProps> = ({
  personUuid,
  isEdited = true,
  onCompleted,
  onError,
}) => {
  const soleTraderDetailsFormData = useSoleTraderDetailsFormDataQuery(
    personUuid,
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
    !soleTraderDetailsFormData.data?.personByUuid ||
    soleTraderDetailsFormData.data?.personByUuid === null
  ) {
    return null;
  }

  const { addresses, partyId } = soleTraderDetailsFormData.data.personByUuid;
  return (
    <SoleTraderDetailsForm
      addresses={addresses}
      dropdownData={soleTraderDetailsFormData.data!.allDropDowns}
      isEdited={isEdited}
      onSubmit={async values => {}}
    />
  );
};

export default SoleTraderDetailsFormContainer;
