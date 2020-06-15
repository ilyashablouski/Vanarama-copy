import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import { ordersByPartyUuidData } from './gql';
import { IProps } from './interfaces';

const OrderInformationContainer: React.FC<IProps> = ({ partyByUuid }) => {
  const { data, loading } = ordersByPartyUuidData(partyByUuid, [
    'complete',
    'new',
    'incomplete',
  ]);

  if (loading) {
    return <Loading size="large" />;
  }

  return (
    <div className="row:bg-light">
      <div className="row:cards-3col">
        <Card
          title={{
            title: 'My Orders',
            description: `You have (${
              data?.ordersByPartyUuid.length ? data.ordersByPartyUuid.length : 0
            }) orders.`,
          }}
        >
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{ href: '/account/my-orders/', label: '' }}
          >
            View Orders
          </RouterLink>
        </Card>

        <Card
          title={{
            title: 'My Quotes',
            description: `You have (${0}) quotes.`,
          }}
        >
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{ href: '/', label: '' }}
          >
            View Quotes
          </RouterLink>
        </Card>
      </div>
    </div>
  );
};

export default OrderInformationContainer;
