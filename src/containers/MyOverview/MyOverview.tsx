/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import OrderCard from '@vanarama/uibook/lib/components/molecules/cards/OrderCard/OrderCard';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import React, { useState, CSSProperties } from 'react';
import cx from 'classnames';
import { NextRouter } from 'next/router';
import { useApolloClient, gql } from '@apollo/client';
import {
  useOrdersByPartyUuidData,
  useCarDerivativesData,
} from '../OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import { GetOrdersByPartyUuid_ordersByPartyUuid } from '../../../generated/GetOrdersByPartyUuid';
import { createOffersObject } from './helpers';
import { GetCachedOrderInformation } from '../../../generated/GetCachedOrderInformation';

interface IMyOverviewProps {
  partyByUuid: string;
  quote: boolean;
  router: NextRouter;
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
  status?: string[];
  changeStatus?: React.Dispatch<React.SetStateAction<string[]>>;
}

const MyOverview: React.FC<IMyOverviewProps> = props => {
  const {
    partyByUuid,
    quote,
    router,
    activeTab,
    setActiveTab,
    status,
    changeStatus,
  } = props;
  const client = useApolloClient();
  const [activePage, setActivePage] = useState(1);
  const PATH = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'My Account', href: '/account/my-details' },
      { label: `My ${quote ? 'Quotes' : 'Orders'}`, href: '/' },
    ],
  };

  // call query for get Orders
  const { data, loading } = useOrdersByPartyUuidData(
    partyByUuid,
    quote ? ['quote', 'new'] : status || [],
    !quote ? ['quote', 'expired'] : ['expired'],
  );

  // collect everything capId from orders
  const capIdArray =
    data?.ordersByPartyUuid?.reduce((array, el) => {
      const capId = el.lineItems[0].vehicleProduct?.derivativeCapId || '';
      if (capId !== array[0]) {
        array.unshift(capId);
      }
      return array;
    }, [] as string[]) || [];

  // call query for get DerivativesData
  const dataCars = useCarDerivativesData(capIdArray, VehicleTypeEnum.CAR);

  // check what we have 'credit' order and this order credit not in status 'draft'
  const hasCreditCompleteOrder = () =>
    !!data?.ordersByPartyUuid.find(
      el =>
        el.status === 'credit' &&
        el.lineItems[0].creditApplications?.length &&
        el.lineItems[0].creditApplications[0].status !== 'draft',
    );

  // check what we have 'credit' order and this order credit in status 'draft'
  const hasCreditIncompleteOrder = () =>
    !!data?.ordersByPartyUuid.find(
      el =>
        el.status === 'credit' &&
        el.lineItems[0].creditApplications?.length &&
        el.lineItems[0].creditApplications[0].status === 'draft',
    );

  // calculate how many pages we have for pagination
  const countPages = () =>
    Math.ceil((data?.ordersByPartyUuid?.length || 0) / 6);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab!(value);
    switch (value) {
      case 1:
        // when we click 'Complete' btn, change statuses for call useOrdersByPartyUuidData
        changeStatus!(['credit']);
        break;
      case 2:
        // when we click 'Incomplete' btn, change statuses for call useOrdersByPartyUuidData
        changeStatus!(['credit', 'draft']);
        break;
      default:
        // when we click 'All Orders' btn, change statuses for call useOrdersByPartyUuidData
        changeStatus!([]);
        break;
    }
  };

  const onClickOrderBtn = (
    orderUuid: string,
    orderCapId: string,
    leaseType: LeaseTypeEnum,
    vehicleType: VehicleTypeEnum,
  ) => {
    // when we click 'Order' btn, need write data to apollo client cache with orderUuid and orderCapId
    client.writeQuery<GetCachedOrderInformation>({
      query: gql`
        query GetCachedOrderInformation {
          selectedOrderUuid
          selectedDerivativeId
          selectedVehicleType
        }
      `,
      data: {
        selectedOrderUuid: orderUuid,
        selectedDerivativeId: orderCapId,
        selectedVehicleType: vehicleType,
      },
    });
    // change current page to '/olaf/about' or '/b2b/olaf/about'
    router.push(
      leaseType === LeaseTypeEnum.PERSONAL ? '/olaf/about' : '/b2b/olaf/about',
    );
  };

  const renderChoiceBtn = (index: number, text: string) => (
    <button
      className={cx('choicebox', { '-active': activeTab === index })}
      onClick={() => onChangeTabs(index)}
      type="button"
      key={index}
    >
      {text}
    </button>
  );

  const renderOffers = () => {
    const indexOfLastOffer = activePage * 6;
    const indexOfFirstOffer = indexOfLastOffer - 6;
    // we get the right amount of orders for the current page, sorted by createdAt date from last
    const showOffers =
      data?.ordersByPartyUuid
        .slice(indexOfFirstOffer, indexOfLastOffer)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .reverse() || [];
    return showOffers.map((order: GetOrdersByPartyUuid_ordersByPartyUuid) => {
      // we get derivative data for this offers
      const derivative = dataCars?.data?.derivatives?.find(
        (der: { id: string }) =>
          der.id === order.lineItems[0].vehicleProduct?.derivativeCapId,
      );
      // we get offers credit state
      const creditState =
        (order.status === 'credit' &&
          order.lineItems[0].creditApplications?.length &&
          order.lineItems[0].creditApplications[0].status) ||
        '';
      return (
        <OrderCard
          style={{ '--img-w': '300px' } as CSSProperties}
          inline
          imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=40344"
          key={order.id}
          title={{
            title: `${derivative?.manufacturerName ||
              ''} ${derivative?.modelName || ''}`,
            description: derivative?.name || '',
          }}
          orderDetails={createOffersObject(
            order.id,
            order.createdAt,
            order.leaseType,
            creditState,
            order.lineItems[0].vehicleProduct!,
            derivative,
            <Button
              color="teal"
              label={quote ? 'Continue To Order' : 'Order Now'}
              onClick={() =>
                onClickOrderBtn(
                  order.uuid,
                  derivative?.id || '',
                  order.leaseType,
                  order.lineItems[0]?.vehicleProduct
                    ?.vehicleType as VehicleTypeEnum,
                )
              }
            />,
            quote,
          )}
          header={
            !quote && !!creditState
              ? {
                  text: creditState === 'draft' ? 'Incomplete' : 'Complete',
                  complete: creditState !== 'draft',
                  incomplete: creditState === 'draft',
                }
              : undefined
          }
        />
      );
    });
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
          My {quote ? 'Quotes' : 'Orders'}
        </Heading>
      </div>
      {!data?.ordersByPartyUuid?.length && !loading ? (
        <div
          className="dpd-content"
          style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
        >
          You have no {quote ? 'Quotes' : 'Orders'}.
        </div>
      ) : (
        <div className="row:bg-lighter -thin">
          <div className="row:results">
            {!quote && (
              <div className="choiceboxes -teal">
                {renderChoiceBtn(0, 'All Orders')}
                {hasCreditCompleteOrder() && renderChoiceBtn(1, 'Complete')}
                {hasCreditIncompleteOrder() && renderChoiceBtn(2, 'Incomplete')}
              </div>
            )}
            {loading ? (
              <Loading size="large" />
            ) : (
              <>
                <div className="row:cards-1col">{renderOffers()}</div>
                {pages.length > 1 && (
                  <Pagination
                    path=""
                    pages={pages}
                    onClick={el => {
                      el.preventDefault();
                      setActivePage(+(el.target as Element).innerHTML);
                    }}
                    selected={activePage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyOverview;
