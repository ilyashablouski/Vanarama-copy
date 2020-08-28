/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import OrderCard from '@vanarama/uibook/lib/components/molecules/cards/OrderCard/OrderCard';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import React, { useState, CSSProperties, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import {
  useOrdersByPartyUuidData,
  useCarDerivativesData,
} from '../OrdersInformation/gql';
import { VehicleTypeEnum, LeaseTypeEnum } from '../../../generated/globalTypes';
import {
  GetOrdersByPartyUuid_ordersByPartyUuid,
  GetOrdersByPartyUuid,
} from '../../../generated/GetOrdersByPartyUuid';
import { createOffersObject } from './helpers';
import { getUrlParam } from '../../utils/url';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../generated/GetCompaniesByPersonUuid';

type QueryParams = {
  partyByUuid?: string;
  uuid?: string;
};

interface IMyOverviewProps {
  quote: boolean;
}

const MyOverview: React.FC<IMyOverviewProps> = props => {
  const router = useRouter();
  const { partyByUuid, uuid } = router.query as QueryParams;
  const { quote } = props;

  const [activePage, setActivePage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [status, changeStatus] = useState<string[]>([]);
  const [statusesCA, changeStatusesCA] = useState<string[]>([]);
  const [exStatusesCA, changeExlStatusesCA] = useState<string[]>([]);
  const [initData, setInitData] = useState<GetOrdersByPartyUuid>();
  const [breadcrumbPath, setBreadcrumbPath] = useState([] as any);
  const [partyUuidArray, setPartyUuidArray] = useState<string[]>([]);

  const getCompaniesData = useImperativeQuery(GET_COMPANIES_BY_PERSON_UUID);

  useEffect(() => {
    if (partyByUuid && uuid) {
      if (!breadcrumbPath.length) {
        setBreadcrumbPath([
          { label: 'Home', href: '/', as: '' },
          {
            label: 'My Account',
            // TODO: Need switch as to href when we update Breadcrumb
            as: `/account/my-details/[uuid]/${getUrlParam({ partyByUuid })}`,
            href: `/account/my-details/${uuid}${getUrlParam({ partyByUuid })}`,
          },
          { label: `My ${quote ? 'Quotes' : 'Orders'}`, href: '/', as: '' },
        ]);
      }
      if (!partyUuidArray.length) {
        getCompaniesData({
          personUuid: uuid,
        }).then(resp => {
          const companiesPartyUuid: string[] = resp.data?.companiesByPersonUuid?.map(
            (companies: CompaniesByPersonUuid) => companies.partyUuid,
          );
          setPartyUuidArray(companiesPartyUuid);
        });
      }
    }
  }, [
    partyByUuid,
    uuid,
    quote,
    getCompaniesData,
    partyUuidArray,
    breadcrumbPath,
  ]);

  // call query for get Orders
  const [getOrders, { data, loading }] = useOrdersByPartyUuidData(
    [partyByUuid as string, ...partyUuidArray] || [''],
    quote ? ['quote', 'new'] : status || [],
    !quote ? ['quote', 'expired', 'new'] : ['expired'],
    (!quote && statusesCA) || [],
    (!quote && exStatusesCA) || [],
  );

  useEffect(() => {
    if (partyByUuid && partyUuidArray.length && !data) {
      getOrders();
    }
  }, [partyByUuid, getOrders, router.query.partyByUuid, data, partyUuidArray]);

  // collect everything capId from orders
  const capIdArray = data?.ordersByPartyUuid?.reduce((array, el) => {
    const capId = el.lineItems[0].vehicleProduct?.derivativeCapId || '';
    if (capId !== array[0]) {
      array.unshift(capId);
    }
    return array;
  }, [] as string[]) || [''];

  // call query for get DerivativesData
  const dataCars = useCarDerivativesData(capIdArray, VehicleTypeEnum.CAR);
  const dataCarsLCV = useCarDerivativesData(capIdArray, VehicleTypeEnum.LCV);

  useEffect(() => {
    if (data && !initData) {
      setInitData(data);
    }
  }, [data, initData]);

  // check what we have 'credit' order and this order credit not in status 'draft'
  const hasCreditCompleteOrder = () =>
    !!(initData?.ordersByPartyUuid as GetOrdersByPartyUuid_ordersByPartyUuid[])?.find(
      el =>
        el.status === 'credit' &&
        el.lineItems[0].creditApplications?.length &&
        el.lineItems[0].creditApplications[0].status !== 'draft',
    );

  // check what we have 'credit' order and this order credit in status 'draft'
  const hasCreditIncompleteOrder = () =>
    !!(initData?.ordersByPartyUuid as GetOrdersByPartyUuid_ordersByPartyUuid[])?.find(
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
        changeStatus(['credit']);
        changeStatusesCA([]);
        changeExlStatusesCA(['draft']);
        break;
      case 2:
        // when we click 'Incomplete' btn, change statuses for call useOrdersByPartyUuidData
        changeStatus(['credit']);
        changeStatusesCA(['draft']);
        changeExlStatusesCA([]);
        break;
      default:
        // when we click 'All Orders' btn, change statuses for call useOrdersByPartyUuidData
        changeStatus([]);
        changeStatusesCA([]);
        changeExlStatusesCA([]);
        break;
    }
  };

  const onClickOrderBtn = (orderUuid: string, leaseType: LeaseTypeEnum) => {
    // change current page to '/olaf/about' or '/b2b/olaf/about'
    router.push(
      leaseType === LeaseTypeEnum.PERSONAL
        ? `/olaf/about/${orderUuid}`
        : `/b2b/olaf/about/${orderUuid}`,
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
      const derivative =
        dataCars?.data?.derivatives?.find(
          (der: { id: string }) =>
            der.id === order.lineItems[0].vehicleProduct?.derivativeCapId,
        ) ||
        dataCarsLCV?.data?.derivatives?.find(
          (der: { id: string }) =>
            der.id === order.lineItems[0].vehicleProduct?.derivativeCapId,
        );
      const imageSrc =
        dataCars?.data?.vehicleImages?.find(
          el =>
            el?.capId?.toString() ===
            order.lineItems[0].vehicleProduct?.derivativeCapId,
        ) ||
        dataCarsLCV?.data?.vehicleImages?.find(
          el =>
            el?.capId?.toString() ===
            order.lineItems[0].vehicleProduct?.derivativeCapId,
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
          imageSrc={imageSrc?.mainImageUrl || ''}
          key={order.id}
          title={{
            title: `${derivative?.manufacturer.name || ''} ${derivative?.model
              .name || ''}`,
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
              onClick={() => onClickOrderBtn(order.uuid, order.leaseType)}
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
        {!!breadcrumbPath.length && <Breadcrumb items={breadcrumbPath} />}
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
              <div className="choiceboxes -cols-3 -teal">
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
