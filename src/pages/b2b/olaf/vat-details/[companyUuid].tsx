import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import React from 'react';
import VatDetailsForm from '../../../../components/VatDetailsForm/VatDetailsForm';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

export const VatDetailsPage: NextPage = () => (
  <OLAFLayout>
    <VatDetailsForm />
  </OLAFLayout>
);

export default withApollo(VatDetailsPage, { getDataFromTree });
