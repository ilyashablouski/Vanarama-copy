import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GET_MY_ORDERS_DATA } from './gql';
import { IProps } from './interfaces';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';
import { MyOrdersTypeEnum } from '../../../generated/globalTypes';
import Skeleton from '../../components/Skeleton';
import {
  GetCompaniesByPersonUuid,
  GetCompaniesByPersonUuidVariables,
} from '../../../generated/GetCompaniesByPersonUuid';
import {
  GetMyOrders,
  GetMyOrdersVariables,
} from '../../../generated/GetMyOrders';
import {
  getPartyUuidsFromCompanies,
  filterExistingUuids,
  saveOrders,
} from '../LoginFormContainer/LoginFormContainer';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

const OrderInformationContainer: React.FC<IProps> = ({ person }) => {
  const [ordersLength, setOrdersLength] = useState<number | null>(null);
  const [quotesLength, setQuotesLength] = useState<number | null>(null);

  const getCompaniesData = useImperativeQuery<
    GetCompaniesByPersonUuid,
    GetCompaniesByPersonUuidVariables
  >(GET_COMPANIES_BY_PERSON_UUID);
  const getOrdersData = useImperativeQuery<GetMyOrders, GetMyOrdersVariables>(
    GET_MY_ORDERS_DATA,
  );

  useEffect(() => {
    if (person?.partyUuid && quotesLength === null && ordersLength === null) {
      getCompaniesData({
        personUuid: person.uuid,
      })
        .then(getPartyUuidsFromCompanies)
        .then(filterExistingUuids(person.partyUuid))
        .then(partyUuid =>
          Promise.all([
            getOrdersData({
              partyUuid,
              filter: MyOrdersTypeEnum.ALL_ORDERS,
            }),
            getOrdersData({
              partyUuid,
              filter: MyOrdersTypeEnum.ALL_QUOTES,
            }),
          ]),
        )
        .then(saveOrders)
        .catch(() => [])
        .then(([orders, quotes]) => {
          setOrdersLength(orders || 0);
          setQuotesLength(quotes || 0);
        });
    }
  }, [person, getOrdersData, quotesLength, ordersLength, getCompaniesData]);

  return (
    <div className="row:bg-light">
      <div className="row:cards-3col">
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          title={{
            title: 'My Orders',
          }}
          className="card--details"
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
                query: { uuid: person?.uuid },
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
          className="card--details"
        >
          <Text
            tag="span"
            size="regular"
            color="dark"
            className="text--quotes"
          >{`You have (${quotesLength ?? 0}) quotes.`}</Text>
          {!!quotesLength && (
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
