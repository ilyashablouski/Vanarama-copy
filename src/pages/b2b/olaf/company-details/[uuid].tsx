import React from 'react';
import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

const CompanyDetailsPage: NextPage = () => (
  <OLAFLayout>
    <Heading color="black" dataTestId="company-details_heading" size="xlarge">
      Company Details
    </Heading>
  </OLAFLayout>
);

export default CompanyDetailsPage;
