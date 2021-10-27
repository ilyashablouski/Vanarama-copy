import { NextPage } from 'next';
import React from 'react';
import withApollo from '../../../hocs/withApollo';
import MyOverview from '../../../containers/MyOverview/MyOverview';
import { GetMyOrders } from '../../../../generated/GetMyOrders';
import { GetPerson_getPerson } from '../../../../generated/GetPerson';

const MyOrdersPage: NextPage = () => {
  return (
    <MyOverview
      quote
      orders={{} as GetMyOrders} // it will be fix in ticket 7728
      person={{} as GetPerson_getPerson} // it will be fix in ticket 7728
      partyUuid={['', '']} // it will be fix in ticket 7728
      error={false} // it will be fix in ticket 7728
    />
  );
};

export default withApollo(MyOrdersPage);
