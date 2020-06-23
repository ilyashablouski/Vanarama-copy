import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId, uuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <AddressFormContainer
        onCompleted={() => {
          const params = getUrlParam({ derivativeId, orderId });
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${params}`
              : `/olaf/employment-history/[uuid]${params}`;

          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
