/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import SoleTraderDetailsForm from '../../components/SoleTraderDetailsForm';
import { ISoleTraderDetailsFormContainerProps } from './interface';

const SoleTraderDetailsFormContainer: React.FC<ISoleTraderDetailsFormContainerProps> = ({
  personUuid,
  orderUuid,
  isEdited,
  onCompleted,
  onError,
}) => {
  return <SoleTraderDetailsForm isEdited onSubmit={async values => {}} />;
};

export default SoleTraderDetailsFormContainer;
