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
import {
  useOrdersByPartyUuidData,
  useCarDerivativesData,
} from '../OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import { GetOrdersByPartyUuid_ordersByPartyUuid } from '../../../generated/GetOrdersByPartyUuid';
import { createOffersObject } from './helpers';

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
  const [activePage, setActivePage] = useState(1);
  const PATH = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'My Account', href: '/account/my-details' },
      { label: `My ${quote ? 'Quotes' : 'Orders'}`, href: '/' },
    ],
  };

  const { data, loading } = useOrdersByPartyUuidData(
    partyByUuid,
    quote ? ['quote'] : status || [],
    !quote ? ['quote'] : [],
  );

  const capIdArray =
    data?.ordersByPartyUuid?.reduce((array, el) => {
      const capId = el.lineItems[0].vehicleProduct?.derivativeCapId || '';
      if (capId !== array[0]) {
        array.unshift(capId);
      }
      return array;
    }, [] as string[]) || [];

  const dataCars = useCarDerivativesData(capIdArray, VehicleTypeEnum.CAR);

  const hasCreditCompleteOrder = () =>
    !!data?.ordersByPartyUuid.find(
      el =>
        el.aasmState === 'credit' &&
        el.lineItems[0].creditApplications &&
        el.lineItems[0].creditApplications[0]?.aasmState !== 'draft',
    );

  const hasCreditIncompleteOrder = () =>
    !!data?.ordersByPartyUuid.find(
      el =>
        el.aasmState === 'credit' &&
        el.lineItems[0].creditApplications &&
        el.lineItems[0].creditApplications[0]?.aasmState === 'draft',
    );
  const countPages = () =>
    Math.ceil((data?.ordersByPartyUuid?.length || 0) / 6);
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab!(value);
    switch (value) {
      case 1:
        changeStatus!(['credit']);
        break;
      case 2:
        changeStatus!(['credit', 'draft']);
        break;
      default:
        changeStatus!([]);
        break;
    }
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
    const showOffers =
      data?.ordersByPartyUuid
        .slice(indexOfFirstOffer, indexOfLastOffer)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .reverse() || [];
    return showOffers.map((el: GetOrdersByPartyUuid_ordersByPartyUuid) => {
      const derivative = dataCars?.data?.derivatives?.find(
        (der: { id: string }) =>
          der.id === el.lineItems[0].vehicleProduct?.derivativeCapId,
      );
      const creditState =
        (el.lineItems[0].creditApplications &&
          el.lineItems[0].creditApplications[0]?.aasmState) ||
        '';
      return (
        <OrderCard
          style={{ '--img-w': '300px' } as CSSProperties}
          inline
          imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=40344"
          key={el.id}
          title={{
            title: `${derivative?.manufacturerName ||
              ''} ${derivative?.modelName || ''}`,
            description: derivative?.name || '',
          }}
          orderDetails={createOffersObject(
            el.id,
            el.createdAt,
            el.leaseType,
            creditState,
            el.lineItems[0].vehicleProduct!,
            derivative,
            <Button
              color="teal"
              label={quote ? 'Continue To Order' : 'Order Now'}
              onClick={() => {
                router.push(
                  el.leaseType === LeaseTypeEnum.PERSONAL
                    ? '/olaf/about'
                    : '/b2b/olaf/about',
                );
              }}
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
