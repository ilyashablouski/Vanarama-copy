import Card from '@vanarama/uibook/lib/components/molecules/cards';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import localForage from 'localforage';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GET_ORDERS_BY_PARTY_UUID_DATA } from './gql';
import { IProps } from './interfaces';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../generated/GetCompaniesByPersonUuid';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';

type QueryParams = {
  partyByUuid: string;
  uuid: string;
};

const OrderInformationContainer: React.FC<IProps> = () => {
  const router = useRouter();
  const { uuid, partyByUuid } = router.query as QueryParams;
  const [ordersLength, setOrdersLength] = useState<number | null>(null);
  const [quotesLength, setQuotesLength] = useState<number | null>(null);

  const getCompaniesData = useImperativeQuery(GET_COMPANIES_BY_PERSON_UUID);
  const getOrdersData = useImperativeQuery(GET_ORDERS_BY_PARTY_UUID_DATA);

  useEffect(() => {
    if (partyByUuid && quotesLength === null && ordersLength === null) {
      const partyUuidArray = [partyByUuid];
      getCompaniesData({
        personUuid: uuid,
      }).then(resp => {
        resp.data?.companiesByPersonUuid?.forEach(
          (companies: CompaniesByPersonUuid) =>
            partyUuidArray.push(companies.partyUuid),
        );
        getOrdersData({
          partyUuid: partyUuidArray,
          excludeStatuses: ['quote', 'expired', 'new'],
        }).then(response => {
          setOrdersLength(response.data?.ordersByPartyUuid.length);
          localForage.setItem(
            'ordersLength',
            response.data?.ordersByPartyUuid.length,
          );
        });
        getOrdersData({
          partyUuid: partyUuidArray,
          statuses: ['quote', 'new'],
          excludeStatuses: ['expired'],
        }).then(response => {
          setQuotesLength(response.data?.ordersByPartyUuid.length);
          localForage.setItem(
            'quotesLength',
            response.data?.ordersByPartyUuid.length,
          );
        });
      });
    }
  }, [
    partyByUuid,
    getOrdersData,
    quotesLength,
    ordersLength,
    getCompaniesData,
    uuid,
  ]);

  return (
    <div className="row:bg-light">
      <div className="row:cards-3col">
        <Card
          title={{
            title: 'My Orders',
          }}
        >
          <Text
            tag="span"
            size="regular"
            color="dark"
          >{`You have (${ordersLength ?? 0}) orders.`}</Text>
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{
              href: `/account/my-orders/[partyByUuid]`,
              label: '',
              query: { uuid },
            }}
            as={`/account/my-orders/${partyByUuid}?uuid=${uuid}`}
            onClick={ev => !ordersLength && ev.preventDefault()}
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
          >{`You have (${quotesLength ?? 0}) quotes.`}</Text>
          <RouterLink
            classNames={{
              color: 'teal',
            }}
            link={{
              href: `/account/my-quotes/[partyByUuid]`,
              label: '',
              query: { uuid },
            }}
            as={`/account/my-quotes/${partyByUuid}?uuid=${uuid}`}
            onClick={ev => !quotesLength && ev.preventDefault()}
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
