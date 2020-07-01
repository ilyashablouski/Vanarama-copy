import Card from '@vanarama/uibook/lib/components/molecules/cards';
import React from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useOrdersByPartyUuidData } from './gql';
import { IProps } from './interfaces';

export const PARTY_BY_UUID = 'f5229b02-7d8a-47f9-b33e-bb9137fded23';

const OrderInformationContainer: React.FC<IProps> = ({ partyByUuid }) => {
  const orders = useOrdersByPartyUuidData(
    partyByUuid || PARTY_BY_UUID,
    [],
    ['quote', 'expired'],
  );
  const haveOrders = !!orders.data?.ordersByPartyUuid.length;

  const quotes = useOrdersByPartyUuidData(
    partyByUuid || PARTY_BY_UUID,
    ['quote', 'new'],
    ['expired'],
  );
  const haveQuotes = !!quotes.data?.ordersByPartyUuid.length;

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
          <Text tag="span" size="regular" color="dark">{`You have (${
            haveQuotes ? quotes.data?.ordersByPartyUuid.length : 0
          }) quotes.`}</Text>
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{ href: '/account/my-quotes', label: '' }}
            onClick={ev => !haveQuotes && ev.preventDefault()}
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
