import React from 'react';
import CompanyDetailsForm from '../../components/SoleTraderCompanyDetailsForm';
// import {} from './gql';

export const SoleTraderCompanyDetailsFormContainer: React.FC = () => {
  return (
    <CompanyDetailsForm
      onSubmit={values => {
        console.log({ values });
      }}
    />
  );
};

export default SoleTraderCompanyDetailsFormContainer;
