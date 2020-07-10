import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../../hocs/withApollo';
import MyOverview from '../../../containers/MyOverview/MyOverview';
import { PARTY_BY_UUID } from '../../../containers/OrdersInformation/OrderInformationContainer';

type QueryParams = {
  partyByUuid?: string;
};

const MyOrdersPage: NextPage = () => {
  const router = useRouter();
  const { partyByUuid = PARTY_BY_UUID } = router.query as QueryParams;

  return <MyOverview quote={false} partyByUuid={partyByUuid} router={router} />;
};

export default withApollo(MyOrdersPage);
