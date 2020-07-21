import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import SoleTraderCompanyDetailsFormFields from './SoleTraderCompanyDetailsFormFields';
import {
  ISoleTraderCompanyDetailsFormValues,
  ISoleTraderCompanyDetailsFormProps,
} from './interfaces';

const SoleTraderCompanyDetailsForm: React.FC<ISoleTraderCompanyDetailsFormProps> = () => {
  const methods = useForm<ISoleTraderCompanyDetailsFormValues>();

  return (
    <FormContext {...methods}>
      <SoleTraderCompanyDetailsFormFields />
    </FormContext>
  );
};

export default SoleTraderCompanyDetailsForm;
