import dynamic from 'next/dynamic';
import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import Select from 'core/atoms/select';
import { useSaveOrderMutation } from '../../gql/storedOrder';
import { GET_CAR_DERIVATIVES, useMyOrdersData } from '../OrdersInformation/gql';
import {
  LeaseTypeEnum,
  MyOrdersTypeEnum,
  OrderInputObject,
  SortDirection,
  SortField,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import {
  createOffersObject,
  createOrderInputFromMyOrder,
  findLastFinishedStep,
  sortOrders,
  sortOrderValues,
} from './helpers';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import {
  GetDerivatives,
  GetDerivativesVariables,
} from '../../../generated/GetDerivatives';
import Breadcrumbs from '../../core/atoms/breadcrumbs-v2';
import {
  GetMyOrders,
  GetMyOrders_myOrders,
} from '../../../generated/GetMyOrders';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { GetPerson_getPerson as Person } from '../../../generated/GetPerson';

import useProgressHistory from '../../hooks/useProgressHistory';
import { getUrlParam } from '../../utils/url';
import { useGetPartyByUuidLazyQuery } from '../../components/SummaryForm/gql';
import { GetPartyByUuid } from '../../../generated/GetPartyByUuid';
import { useSavePersonUuidMutation } from '../../gql/storedPersonUuid';
import useAccountRouteChangeStart from '../../hooks/useAccountRouteChangeStart';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Pagination = dynamic(() => import('core/atoms/pagination'), {
  loading: () => <Skeleton count={1} />,
});
const OrderCard = dynamic(
  () => import('core/molecules/cards/OrderCard/OrderCard'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const OrderListEmptyMessage = dynamic(() =>
  import('../../components/ListEmptyMessage/ListEmptyMessage'),
);

interface IMyOverviewProps {
  data: GetMyOrders;
  quote: boolean;
  person: Person;
  partyUuid: string[];
}

const createDefaultBreadcrumbs = (isQuote?: boolean) => [
  { link: { label: 'Home', href: '/' } },
  {
    link: {
      label: 'My Account',
      href: '/account/my-details',
    },
    as: `/account/my-details`,
  },
  {
    link: {
      label: `My ${isQuote ? 'Quotes' : 'Orders'}`,
      href: '/',
    },
  },
];

const getCapIdsFromMyOrders = (result?: GetMyOrders) => {
  return (
    result?.myOrders?.reduce(
      (array, el) => {
        const capId = el.lineItems[0].vehicleProduct?.derivativeCapId || '';

        if (
          capId !== array.carId[0] &&
          el.lineItems[0].vehicleProduct?.vehicleType === VehicleTypeEnum.CAR
        ) {
          array.carId.unshift(capId);
        }

        if (
          capId !== array.lcvId[0] &&
          el.lineItems[0].vehicleProduct?.vehicleType === VehicleTypeEnum.LCV
        ) {
          array.lcvId.unshift(capId);
        }
        return array;
      },
      { lcvId: [] as string[], carId: [] as string[] },
    ) || { carId: [], lcvId: [] }
  );
};

const getStatusFromOrder = (order: GetMyOrders_myOrders) =>
  order.status === 'credit' &&
  order.lineItems[0].creditApplications?.length &&
  order.lineItems[0].creditApplications[0].status;

// check what we have 'credit' order and this order credit not in status 'draft'
const hasCreditCompleteOrder = (data?: GetMyOrders) =>
  !!data?.myOrders?.find(order => getStatusFromOrder(order) !== 'draft');

// check what we have 'credit' order and this order credit in status 'draft'
const hasCreditIncompleteOrder = (data?: GetMyOrders) =>
  !!data?.myOrders?.find(order => getStatusFromOrder(order) === 'draft');

// calculate how many pages we have for pagination
const countPages = (data?: GetMyOrders) =>
  Math.ceil((data?.myOrders?.length || 0) / 6);

const createDefaultMetadata = (isQuote?: boolean) => ({
  canonicalUrl: null,
  legacyUrl: null,
  metaDescription: null,
  metaRobots: null,
  name: null,
  pageType: null,
  publishedOn: null,
  slug: null,
  title: `My ${isQuote ? 'Quotes' : 'Orders'} | Vanarama`,
  schema: null,
  breadcrumbs: null,
});

const findCompanyByPartyUuid = (
  query: ApolloQueryResult<GetPartyByUuid>,
  partyUuid?: string | null,
) =>
  query.data?.partyByUuid?.person?.companies?.find(
    company => company.partyUuid === partyUuid,
  );

const getOlafUrlFromOrder = (order: OrderInputObject) =>
  order.leaseType === LeaseTypeEnum.PERSONAL
    ? '/olaf/about'
    : '/b2b/olaf/about';

const mapTabIndexToOrderType = (value: React.SetStateAction<number>) => {
  switch (value) {
    case 1:
      // when we click 'Complete' btn, change statuses for call useOrdersByPartyUuidData
      return MyOrdersTypeEnum.COMPLETED_ORDERS;
    case 2:
      // when we click 'Incomplete' btn, change statuses for call useOrdersByPartyUuidData
      return MyOrdersTypeEnum.IN_PROGRESS_ORDERS;
    default:
      // when we click 'All Orders' btn, change statuses for call useOrdersByPartyUuidData
      return MyOrdersTypeEnum.ALL_ORDERS;
  }
};

const MyOverview: React.FC<IMyOverviewProps> = ({
  data: dataForFirstRender,
  quote,
  person,
  partyUuid,
}) => {
  const router = useRouter();
  const [data, setData] = useState(dataForFirstRender);
  const client = useApolloClient();
  const isLoading = useAccountRouteChangeStart(router);

  useEffect(
    () => client.onResetStore(() => router.push('/account/login-register')),
    [client, router],
  );

  const { setCachedLastStep } = useProgressHistory();
  const [activePage, setActivePage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, changeFilter] = useState<MyOrdersTypeEnum>(
    MyOrdersTypeEnum.ALL_ORDERS,
  );
  const [dataCars, setDataCars] = useState<GetDerivatives | null>(null);
  const [dataCarsLCV, setDataCarsLCV] = useState<GetDerivatives | null>(null);
  const [sortOrder, setSortOrder] = useState({
    type: SortField.availability,
    direction: SortDirection.ASC,
  });
  const getPartyByUuid = useGetPartyByUuidLazyQuery();
  const [savePersonUuidMutation] = useSavePersonUuidMutation();

  const breadcrumbPath = useMemo(() => createDefaultBreadcrumbs(quote), [
    quote,
  ]);

  const onCompletedGetOrders = (result: GetMyOrders) => setData(result);

  // call query for get Orders when user change orders type (all/completed/in progress)
  const [getOrders, { loading }] = useMyOrdersData(
    [person?.partyUuid || '', ...(partyUuid || '')],
    filter,
    onCompletedGetOrders,
  );

  // collect car and lcv capId from orders
  const capIdArrayData = getCapIdsFromMyOrders(data);

  // call query for get DerivativesData
  const getCarsDerivative = useImperativeQuery<
    GetDerivatives,
    GetDerivativesVariables
  >(GET_CAR_DERIVATIVES);

  useEffect(() => {
    if (!!capIdArrayData.carId.length && dataCars === null) {
      getCarsDerivative({
        ids: capIdArrayData.carId,
        vehicleType: VehicleTypeEnum.CAR,
      }).then(resp => setDataCars(resp.data));
    }
    if (!!capIdArrayData.lcvId.length && dataCarsLCV === null) {
      getCarsDerivative({
        ids: capIdArrayData.lcvId,
        vehicleType: VehicleTypeEnum.LCV,
      }).then(resp => setDataCarsLCV(resp.data));
    }
  }, [
    capIdArrayData.carId,
    capIdArrayData.lcvId,
    getCarsDerivative,
    dataCars,
    dataCarsLCV,
  ]);

  // handler for changing sort dropdown
  const onChangeSortOrder = (value: string) => {
    const [type, direction] = value.split('_');
    setSortOrder({
      type: type as SortField,
      direction: direction as SortDirection,
    });
  };

  // create array with number of page for pagination
  const pages = useMemo(
    () =>
      Array(countPages(data))
        .fill(0)
        .map((_, index) => index + 1),
    [data],
  );

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab!(value);
    changeFilter(mapTabIndexToOrderType(value));
    getOrders();
  };

  const [saveOrderMutation] = useSaveOrderMutation();
  const saveOrder = (order: OrderInputObject) =>
    saveOrderMutation({
      variables: {
        order,
      },
    });

  const onClickOrderBtn = (
    selectedOrder: GetMyOrders_myOrders,
    customer?: Person | null,
  ) => {
    const creditApplication =
      selectedOrder.lineItems?.[0].creditApplications?.[0];
    const order = createOrderInputFromMyOrder(selectedOrder);
    const lastFinishedStep = findLastFinishedStep(creditApplication);

    Promise.all([
      saveOrder(order),
      savePersonUuidMutation({
        variables: {
          uuid: customer?.uuid,
        },
      }),
    ])
      .then(() => client.clearStore())
      .then(() => setCachedLastStep(lastFinishedStep?.step || 1))
      .then(() => {
        if (order?.leaseType === LeaseTypeEnum.BUSINESS) {
          return getPartyByUuid({ uuid: customer?.partyUuid || '' })
            .then(query => findCompanyByPartyUuid(query, order.partyUuid))
            .then(company => company?.uuid);
        }
        return undefined;
      })
      .catch(() => undefined)
      .then(companyUuid => getUrlParam({ companyUuid }))
      .then(urlParams => [getOlafUrlFromOrder(order), urlParams])
      .then(params => params.join(''))
      .then(url => router.push(url, url));
  };

  const renderChoiceBtn = (index: number, text: string) => (
    <button
      className={cx('choice-box', { '-active': activeTab === index })}
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

    const sortedOffers = data.myOrders
      .slice()
      .sort((firstOrder, secondOrder) =>
        sortOrders(firstOrder, secondOrder, sortOrder.type),
      );

    const placedInTurnOrders =
      sortOrder.direction === SortDirection.DESC
        ? sortedOffers?.reverse()
        : sortedOffers;

    const showOffers =
      placedInTurnOrders?.slice(indexOfFirstOffer, indexOfLastOffer) || [];

    return showOffers.map((order: GetMyOrders_myOrders) => {
      // we get derivative data for this offers
      const isCar =
        order.lineItems[0].vehicleProduct?.vehicleType === VehicleTypeEnum.CAR;
      const query = isCar ? dataCars : dataCarsLCV;

      const derivative = query?.derivatives?.find(
        item => item.id === order.lineItems[0].vehicleProduct?.derivativeCapId,
      );
      const imageSrc = query?.vehicleImages?.find(
        item =>
          item?.capId?.toString() ===
          order.lineItems[0].vehicleProduct?.derivativeCapId,
      );

      // we get offers credit state
      const creditState = getStatusFromOrder(order) || '';

      return (
        <OrderCard
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          style={{ '--img-w': '300px' } as CSSProperties}
          inline
          imageSrc={imageSrc?.mainImageUrl || ''}
          key={order.uuid}
          title={{
            title: `${derivative?.manufacturer.name || ''} ${derivative?.model
              .name || ''}`,
            description: derivative?.name || '',
          }}
          orderDetails={createOffersObject(
            order.createdAt,
            order.leaseType,
            creditState,
            order.lineItems[0].vehicleProduct!,
            derivative,
            <Button
              color="teal"
              label={quote ? 'Continue To Order' : 'View Order'}
              onClick={() => onClickOrderBtn(order, person)}
            />,
            quote,
          )}
          header={
            !quote && !!creditState
              ? {
                  text: creditState === 'draft' ? 'In Progress' : 'Complete',
                  complete: creditState !== 'draft',
                  incomplete: creditState === 'draft',
                }
              : undefined
          }
        />
      );
    });
  };

  const metaData = useMemo(() => createDefaultMetadata(quote), [quote]);

  return (
    <>
      <div className="row:title">
        {!!breadcrumbPath.length && <Breadcrumbs items={breadcrumbPath} />}
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="my-details-heading"
        >
          My {quote ? 'Quotes' : 'Orders'}
        </Heading>
      </div>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <div className="row:bg-lighter -thin">
          {!data?.myOrders?.length && !loading ? (
            <OrderListEmptyMessage
              text={`Your ${
                quote ? 'quotes' : 'orders'
              } list is empty right now.`}
              className="wishlist"
            />
          ) : (
            <div className="row:results">
              {!quote && (
                <div className="choice-boxes -cols-3 -teal">
                  {renderChoiceBtn(0, 'All Orders')}
                  {hasCreditCompleteOrder(dataForFirstRender) &&
                    renderChoiceBtn(1, 'Completed')}
                  {hasCreditIncompleteOrder(dataForFirstRender) &&
                    renderChoiceBtn(2, 'In Progress')}
                </div>
              )}
              {loading ? (
                <Loading size="large" />
              ) : (
                data?.myOrders?.length && (
                  <>
                    <Text tag="span" color="darker" size="regular">
                      Showing {data?.myOrders?.length} Orders
                    </Text>
                    <Select
                      value={`${sortOrder.type}_${sortOrder.direction}`}
                      onChange={event => onChangeSortOrder(event.target.value)}
                    >
                      {sortOrderValues.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </Select>
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
                )
              )}
            </div>
          )}
        </div>
      )}
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default MyOverview;
