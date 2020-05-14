import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OLAFLayout>
      <AddressFormContainer
        onCompleted={() => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]`
              : `/olaf/employment-history/[uuid]`;

          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
