import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import React from 'react';
import CompanyDetailsForm from '../../../../components/CompanyDetailsForm/CompanyDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

export const CompanyDetailsPage: NextPage = () => (
  <OLAFLayout>
    <CompanyDetailsForm />
  </OLAFLayout>
);

export default withApollo(CompanyDetailsPage, {
  getDataFromTree,
});
