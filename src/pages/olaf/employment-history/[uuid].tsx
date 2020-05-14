import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OLAFLayout>
      <EmploymentFormContainer
        onCompleted={() => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]`
              : `/olaf/expenses/[uuid]`;

          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(EmploymentHistoryPage, { getDataFromTree });
