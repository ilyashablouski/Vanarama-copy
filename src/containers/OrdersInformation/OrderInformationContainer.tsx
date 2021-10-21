import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import localForage from 'localforage';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import { GetMyOrders } from '../../../generated/GetMyOrders';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

interface IProps {
  orders: GetMyOrders;
  quotes: GetMyOrders;
  uuid: string;
}

const OrderInformationContainer: React.FC<IProps> = ({
  orders,
  quotes,
  uuid,
}) => {
  const ordersLength = orders?.length;
  const quotesLength = quotes?.length;

  useEffect(() => {
    localForage.setItem<number | undefined>('ordersLength', ordersLength);
    localForage.setItem<number | undefined>('quotesLength', quotesLength);
  }, [ordersLength, quotesLength]);

  return (
    <div className="row:bg-light">
      <div className="row:cards-3col">
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          title={{
            title: 'My Orders',
          }}
        >
          {typeof ordersLength === 'number' ? (
            <Text
              tag="span"
              size="regular"
              color="dark"
            >{`You have (${ordersLength ?? 0}) orders.`}</Text>
          ) : (
            <Loading className="row-loader" />
          )}
          {ordersLength && (
            <RouterLink
              classNames={{
                color: 'teal',
              }}
              link={{
                href: `/account/my-orders`,
                label: '',
                query: { uuid },
              }}
              as="/account/my-orders"
              dataTestId="orders-link"
            >
              View Orders
            </RouterLink>
          )}
        </Card>

        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          title={{
            title: 'My Quotes',
          }}
        >
          <Text
            tag="span"
            size="regular"
            color="dark"
          >{`You have (${quotesLength ?? 0}) quotes.`}</Text>
          {quotesLength && (
            <RouterLink
              classNames={{
                color: 'teal',
              }}
              link={{
                href: `/account/my-quotes`,
                label: '',
              }}
              as="account/my-quotes"
              dataTestId="quotes-link"
            >
              View Quotes
            </RouterLink>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrderInformationContainer;
