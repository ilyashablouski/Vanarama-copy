import { NextPage } from 'next';
import React from 'react';
import withApollo from '../../../hocs/withApollo';
import MyOverview from '../../../containers/MyOverview/MyOverview';

const MyOrdersPage: NextPage = () => {
  return <MyOverview quote />;
};

export default withApollo(MyOrdersPage);
