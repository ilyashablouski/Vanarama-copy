import { NextPage } from 'next';
import React, { useState } from 'react';
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

  const [activeTab, setActiveTab] = useState(0);
  const [status, changeStatus] = useState<string[]>([]);

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
