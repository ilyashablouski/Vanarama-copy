import { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import withApollo from '../../../hocs/withApollo';
import MyOverview from '../../../containers/MyOverview/MyOverview';
import { PARTY_BY_UUID } from '../../../containers/OrdersInformation/OrderInformationContainer';

const MyOrdersPage: NextPage = () => {
  const router = useRouter();
  const partyByUuid = (router.query.partyByUuid as string) || PARTY_BY_UUID;

  const [activeTab, setActiveTab] = useState(0);
  const [status, changeStatus] = useState([] as string[]);

  return (
    <MyOverview
      quote={false}
      partyByUuid={partyByUuid}
      router={router}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      status={status}
      changeStatus={changeStatus}
    />
  );
};

export default withApollo(MyOrdersPage);
