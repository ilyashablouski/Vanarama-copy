import Card from '@vanarama/uibook/lib/components/molecules/cards';
import React from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useOrdersByPartyUuidData } from './gql';
import { IProps } from './interfaces';

export const PARTY_BY_UUID = 'f5229b02-7d8a-47f9-b33e-bb9137fded23';

const OrderInformationContainer: React.FC<IProps> = ({ partyByUuid }) => {
  const orders = useOrdersByPartyUuidData(
    partyByUuid || PARTY_BY_UUID,
    [],
    ['quote'],
  );
  const haveOrders = !!orders.data?.ordersByPartyUuid.length;

  const quotes = useOrdersByPartyUuidData(partyByUuid || PARTY_BY_UUID, [
    'quote',
  ]);
  const haveQuotes = !!quotes.data?.ordersByPartyUuid.length;

  return (
    <div className="row:bg-light">
      <div className="row:cards-3col">
        <Card
          title={{
            title: 'My Orders',
            description: `You have (${
              haveOrders ? orders.data?.ordersByPartyUuid.length : 0
            }) orders.`,
          }}
        >
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
            description: `You have (${
              haveQuotes ? quotes.data?.ordersByPartyUuid.length : 0
            }) quotes.`,
          }}
        >
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
