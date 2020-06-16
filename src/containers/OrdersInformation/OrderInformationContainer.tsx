import Card from '@vanarama/uibook/lib/components/molecules/cards';
import React from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useOrdersByPartyUuidData } from './gql';
import { IProps } from './interfaces';

const OrderInformationContainer: React.FC<IProps> = ({ partyByUuid }) => {
  const orders = useOrdersByPartyUuidData(partyByUuid, [], ['quote']);
  const haveOrders = !!orders.data?.ordersByPartyUuid.length;

  return (
    <div className="row:bg-light">
      <div className="row:cards-3col">
        <Card
          title={{
            title: 'My Orders',
          }}
        >
          <Text tag="span" size="regular" color="dark">{`You have (${
            haveOrders ? orders.data?.ordersByPartyUuid.length : 0
          }) orders.`}</Text>
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{ href: '/account/my-orders', label: '' }}
            onClick={ev => !haveOrders && ev.preventDefault()}
            dataTestId="orders-link"
          >
            View Orders
          </RouterLink>
        </Card>

        <Card
          title={{
            title: 'My Quotes',
          }}
        >
          <Text
            tag="span"
            size="regular"
            color="dark"
          >{`You have (${0}) quotes.`}</Text>
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{ href: '/account/my-quotes', label: '' }}
            onClick={ev => ev.preventDefault()}
            dataTestId="quotes-link"
          >
            View Quotes
          </RouterLink>
        </Card>
      </div>
    </div>
  );
};

export default OrderInformationContainer;
