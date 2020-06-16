import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../../hocs/withApollo';
import MyOverview from '../../../containers/MyOverview/MyOverview';
import { PARTY_BY_UUID_QUOTES } from '../../../containers/OrdersInformation/OrderInformationContainer';

const MyOrdersPage: NextPage = () => {
  const router = useRouter();
  const partyByUuid =
    (router.query.partyByUuid as string) || PARTY_BY_UUID_QUOTES;

  return <MyOverview quote partyByUuid={partyByUuid} router={router} />;
};

export default withApollo(MyOrdersPage);
