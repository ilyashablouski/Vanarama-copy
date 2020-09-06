/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { ISoleTraderDetailsFormContainerProps } from './interface';
import { useSoleTraderDetailsFormDataQuery } from './gql';

const SoleTraderDetailsFormContainer: React.FC<ISoleTraderDetailsFormContainerProps> = ({
  personUuid,
  orderUuid,
  isEdited,
  onCompleted,
  onError,
}) => {
  const soleTraderDetailsFormData = useSoleTraderDetailsFormDataQuery();
  return (
    <SoleTraderDetailsForm
      dropDownData={soleTraderDetailsFormData.data?.allDropDowns}
      isEdited
      onSubmit={async values => {}}
    />
  );
};

export default SoleTraderDetailsFormContainer;
