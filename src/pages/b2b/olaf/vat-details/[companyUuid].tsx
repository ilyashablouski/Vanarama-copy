import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import withApollo from '../../../../hocs/withApollo';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';

type QueryParams = {
  companyUuid: string;
};

export const VatDetailsPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid } = router.query as QueryParams;
  // eslint-disable-next-line no-console
  console.log('companyUuid', companyUuid);
  return (
    <OLAFLayout>
      <Form>
        <Heading color="black" size="xlarge">
          VAT Details
        </Heading>
      </Form>
    </OLAFLayout>
  );
};

export default withApollo(VatDetailsPage, { getDataFromTree });
