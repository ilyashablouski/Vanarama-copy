import Card from '@vanarama/uibook/lib/components/molecules/cards';
import React from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useOrdersByPartyUuidData } from './gql';
import { IProps } from './interfaces';

export const PARTY_BY_UUID_QUOTES = '7c53729d-7000-4268-8f6b-354ee8e999ce';
export const PARTY_BY_UUID_ORDERS = 'f2404cbb-aa42-4d9c-902f-852949e266e2';

const OrderInformationContainer: React.FC<IProps> = ({ partyByUuid }) => {
  const orders = useOrdersByPartyUuidData(
    partyByUuid || PARTY_BY_UUID_ORDERS,
    [],
    ['quote'],
  );
  const haveOrders = !!orders.data?.ordersByPartyUuid.length;

  const quotes = useOrdersByPartyUuidData(partyByUuid || PARTY_BY_UUID_QUOTES, [
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
