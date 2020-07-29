import Card from '@vanarama/uibook/lib/components/molecules/cards';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { useOrdersByPartyUuidData } from './gql';
import { IProps } from './interfaces';

type QueryParams = {
  partyByUuid: string;
};

const OrderInformationContainer: React.FC<IProps> = () => {
  const router = useRouter();
  const { partyByUuid } = router.query as QueryParams;

  const [getOrdersData, orders] = useOrdersByPartyUuidData(
    partyByUuid,
    [],
    ['quote', 'expired'],
  );

  const [getQuotesData, quotes] = useOrdersByPartyUuidData(
    partyByUuid,
    ['quote', 'new'],
    ['expired'],
  );

  useEffect(() => {
    if (partyByUuid) {
      getOrdersData();
      getQuotesData();
    }
  }, [partyByUuid, getOrdersData, getQuotesData, router.query.partyByUuid]);

  const haveOrders = !!orders.data?.ordersByPartyUuid.length;
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
