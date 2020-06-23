import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam } from '../../../utils/url';

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { uuid, derivativeId, orderId },
  } = router;
  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <AddressFormContainer
        onCompleted={() => {
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${getUrlParam({ orderId, derivativeId })}`
              : `/olaf/employment-history/[uuid]${getUrlParam({
                  orderId,
                  derivativeId,
                })}`;

          router.push(url, url.replace('[uuid]', uuid as string));
        }}
        personUuid={uuid as string}
      />
    </OLAFLayout>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
