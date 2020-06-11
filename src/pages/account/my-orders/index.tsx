import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import { NextPage } from 'next';
import React, { useState } from 'react';
import RouterLink from '../../../components/RouterLink/RouterLink';
import withApollo from '../../../hocs/withApollo';
import { ordersByPartyUuidData } from '../../../containers/OrdersInformation/gql';

interface IProps {}

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'My Account', href: '/account/my-details' },
    { label: 'My Orders', href: '/' },
  ],
};

export const MyOrdersPage: NextPage<IProps> = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    data,
    loading,
  } = ordersByPartyUuidData('894096e9-7536-4ee7-aac3-2f209681d904', [
    'credit',
    'new',
  ]);

  if (loading) {
    return <Loading size="large" />;
  }

  if (!data) {
    return null;
  }

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab(value);
    switch (value) {
      case 1:
      case 2:
        ordersByPartyUuidData('894096e9-7536-4ee7-aac3-2f209681d904', [
          'credit',
        ]);
        break;
      default:
        ordersByPartyUuidData('894096e9-7536-4ee7-aac3-2f209681d904', [
          'complete',
          'new',
          'incomplete',
        ]);
        break;
    }
  };

  const renderOffers = () => {
    return data?.ordersByPartyUuid.map(el => (
      <Card
        key={el.id}
        title={{
          title: el.lineItems[0].vehicleProduct.title || '',
          description: el.lineItems[0].vehicleProduct.description,
        }}
      >
        <RouterLink
          classNames={{
            color: 'teal',
          }}
          link={{ href: '/', label: '' }}
        >
          View Orders
        </RouterLink>
      </Card>
    ));
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={PATH.items} />
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="my-details-heading"
        >
          My Orders
        </Heading>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <Tabs
            activeIndex={activeTab}
            onChange={onChangeTabs}
            variant="alternative"
            align="center"
          >
            <TabList className="lead">
              <Tab index={0}>All Orders</Tab>
              <Tab index={1}>Complete</Tab>
              <Tab index={2}>Incomplete</Tab>
            </TabList>
            <TabPanel index={0}>
              <div className="row:cards-1col">{renderOffers()}</div>
            </TabPanel>
            <TabPanel index={1}>
              <div className="row:cards-1col">{renderOffers()}</div>
            </TabPanel>
            <TabPanel index={2}>
              <div className="row:cards-1col">{renderOffers()}</div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default withApollo(MyOrdersPage);
