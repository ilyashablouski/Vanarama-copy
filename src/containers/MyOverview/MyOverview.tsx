/* eslint-disable @typescript-eslint/camelcase */
import dynamic from 'next/dynamic';
import { useApolloClient } from '@apollo/client';
import React, { useState, CSSProperties, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import Select from 'core/atoms/select';
import localForage from 'localforage';
import { GET_CAR_DERIVATIVES, useMyOrdersData } from '../OrdersInformation/gql';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
  SortField,
  SortDirection,
  MyOrdersTypeEnum,
  LineItemInputObject,
  OrderInputObject,
  VehicleProductInputObject,
} from '../../../generated/globalTypes';
import { createOffersObject, sortOrders, sortOrderValues } from './helpers';
import { getUrlParam } from '../../utils/url';
import { useImperativeQuery } from '../../hooks/useImperativeQuery';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../generated/GetCompaniesByPersonUuid';
import { GetDerivatives } from '../../../generated/GetDerivatives';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import {
  GetMyOrders,
  GetMyOrders_myOrders,
  GetMyOrders_myOrders_lineItems as GetMyOrdersLineItem,
  GetMyOrders_myOrders_lineItems_vehicleProduct as GetMyOrdersVehicleProduct,
} from '../../../generated/GetMyOrders';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import {
  GetPerson,
  GetPerson_getPerson as Person,
} from '../../../generated/GetPerson';

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

type QueryParams = {
  partyByUuid?: string;
  uuid?: string;
};

interface IMyOverviewProps {
  quote: boolean;
}

const createVehicleProductInput = (
  vehicleProduct: GetMyOrdersVehicleProduct | null,
): VehicleProductInputObject => ({
  annualMileage: vehicleProduct?.annualMileage,
  colour: vehicleProduct?.colour,
  depositMonths: vehicleProduct?.depositMonths,
  depositPayment: vehicleProduct?.depositPayment,
  derivativeCapId: vehicleProduct!.derivativeCapId,
  description: vehicleProduct?.description,
  finalPayment: vehicleProduct?.finalPayment,
  financeType: vehicleProduct?.financeType,
  funderId: vehicleProduct?.funderId,
  leadTime: vehicleProduct?.leadTime,
  maintenance: vehicleProduct?.maintenance,
  maintenancePrice: vehicleProduct?.maintenancePrice,
  monthlyPayment: vehicleProduct?.monthlyPayment,
  term: vehicleProduct?.term,
  trim: vehicleProduct?.trim,
  vehicleType: vehicleProduct!.vehicleType,
  vsku: vehicleProduct?.vsku,
});

const createLineItemsInputFromMyOrder = (
  myOrdersLineItems: GetMyOrdersLineItem[],
): LineItemInputObject[] =>
  myOrdersLineItems.map(item => ({
    leadManagerQuoteId: item.leadManagerQuoteId,
    orderId: item.order?.uuid,
    quantity: item.quantity,
    vehicleProduct: createVehicleProductInput(item.vehicleProduct),
  }));

const createOrderInputFromMyOrder = (
  myOrder: GetMyOrders_myOrders,
): OrderInputObject => ({
  leaseType: myOrder.leaseType,
  lineItems: createLineItemsInputFromMyOrder(myOrder.lineItems),
  partyUuid: myOrder.partyUuid,
  personUuid: myOrder.personUuid,
  referenceNumber: myOrder.referenceNumber,
  salesChannel: myOrder.salesChannel,
  uuid: myOrder.uuid,
});

const MyOverview: React.FC<IMyOverviewProps> = props => {
  const router = useRouter();
  const { quote } = props;

  const client = useApolloClient();
  const [person, setPerson] = useState<Person | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, changeFilter] = useState<MyOrdersTypeEnum>(
    MyOrdersTypeEnum.ALL_ORDERS,
  );
  const [initData, setInitData] = useState<GetMyOrders>();
  const [breadcrumbPath, setBreadcrumbPath] = useState([] as any);
  const [partyUuidArray, setPartyUuidArray] = useState<string[] | null>(null);
  const [dataCars, setDataCars] = useState<GetDerivatives | null>(null);
  const [dataCarsLCV, setDataCarsLCV] = useState<GetDerivatives | null>(null);
  const [sortOrder, setSortOrder] = useState({
    type: SortField.availability,
    direction: SortDirection.ASC,
  });

  const getCompaniesData = useImperativeQuery(GET_COMPANIES_BY_PERSON_UUID);

  useEffect(() => {
    if (!person) {
      localForage.getItem<GetPerson>('person').then(value => {
        if (value) {
          setPerson(value.getPerson);
        }
      });
    }
  }, [person]);

  useEffect(() => {
    if (person?.partyUuid && person?.uuid) {
      if (!breadcrumbPath.length) {
        setBreadcrumbPath([
          { link: { label: 'Home', href: '/' } },
          {
            link: {
              label: 'My Account',
              href: '/account/my-details/[uuid]',
              query: {
                partyByUuid: person.partyUuid,
                uuid: person.uuid,
              },
            },
            as: `/account/my-details/${person.uuid}${getUrlParam({
              partyByUuid: person.partyUuid,
            })}`,
          },
          {
            link: {
              label: `My ${quote ? 'Quotes' : 'Orders'}`,
              href: '/',
            },
          },
        ]);
      }
      if (!partyUuidArray) {
        getCompaniesData({
          personUuid: person.uuid,
        }).then(resp => {
          const companiesPartyUuid: string[] = resp.data?.companiesByPersonUuid?.map(
            (companies: CompaniesByPersonUuid) => companies.partyUuid,
          );
          setPartyUuidArray(companiesPartyUuid);
        });
      }
    }
  }, [person, quote, getCompaniesData, partyUuidArray, breadcrumbPath]);

  // call query for get Orders
  const [getOrders, { data, loading }] = useMyOrdersData(
    partyUuidArray
      ? [person?.partyUuid || '', ...partyUuidArray]
      : [person?.partyUuid || ''] || [''],
    quote ? MyOrdersTypeEnum.ALL_QUOTES : filter,
  );

  useEffect(() => {
    if (person?.partyUuid && partyUuidArray !== null && !data) {
      getOrders();
    }
  }, [getOrders, person, data, partyUuidArray]);

  // collect car and lcv capId from orders
  const capIdArrayData = data?.myOrders?.reduce(
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
  ) || { carId: [], lcvId: [] };

  // call query for get DerivativesData
  const getCarsDerivative = useImperativeQuery(GET_CAR_DERIVATIVES);

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

  useEffect(() => {
    if (data && !initData) {
      setInitData(data);
    }
  }, [data, initData]);

  // handler for changing sort dropdown
  const onChangeSortOrder = (value: string) => {
    const [type, direction] = value.split('_');
    setSortOrder({
      type: type as SortField,
      direction: direction as SortDirection,
    });
  };

  // check what we have 'credit' order and this order credit not in status 'draft'
  const hasCreditCompleteOrder = () =>
    !!(initData?.myOrders as any[])?.find(
      el =>
        el.status === 'credit' &&
        el.lineItems[0].creditApplications?.length &&
        el.lineItems[0].creditApplications[0].status !== 'draft',
    );

  // check what we have 'credit' order and this order credit in status 'draft'
  const hasCreditIncompleteOrder = () =>
    !!(initData?.myOrders as any[])?.find(
      el =>
        el.status === 'credit' &&
        el.lineItems[0].creditApplications?.length &&
        el.lineItems[0].creditApplications[0].status === 'draft',
    );

  // calculate how many pages we have for pagination
  const countPages = () => Math.ceil((data?.myOrders?.length || 0) / 6);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab!(value);
    switch (value) {
      case 1:
        // when we click 'Complete' btn, change statuses for call useOrdersByPartyUuidData
        changeFilter(MyOrdersTypeEnum.COMPLETED_ORDERS);
        break;
      case 2:
        // when we click 'Incomplete' btn, change statuses for call useOrdersByPartyUuidData
        changeFilter(MyOrdersTypeEnum.IN_PROGRESS_ORDERS);
        break;
      default:
        // when we click 'All Orders' btn, change statuses for call useOrdersByPartyUuidData
        changeFilter(MyOrdersTypeEnum.ALL_ORDERS);
        break;
    }
  };

  const onClickOrderBtn = (
    myOrder: GetMyOrders_myOrders,
    leaseType: LeaseTypeEnum,
  ) => {
    const order = createOrderInputFromMyOrder(myOrder);

    Promise.all([
      localForage.setItem('order', order),
      localForage.setItem('orderId', order.uuid),
    ])
      .then(() => client.clearStore())
      .then(() =>
        leaseType.toUpperCase() === LeaseTypeEnum.PERSONAL
          ? '/olaf/about'
          : '/b2b/olaf/about',
      )
      .then(url => router.push(url));
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

    const sortedOffers =
      sortOrder.direction === SortDirection.DESC
        ? data?.myOrders
            .slice()
            .sort((a, b) => sortOrders(a, b, sortOrder.type))
            .reverse()
        : data?.myOrders
            .slice()
            .sort((a, b) => sortOrders(a, b, sortOrder.type));
    const showOffers =
      sortedOffers?.slice(indexOfFirstOffer, indexOfLastOffer) || [];
    return showOffers.map((order: GetMyOrders_myOrders) => {
      // we get derivative data for this offers
      const derivative =
        dataCars?.derivatives?.find(
          (der: { id: string }) =>
            der.id === order.lineItems[0].vehicleProduct?.derivativeCapId,
        ) ||
        dataCarsLCV?.derivatives?.find(
          (der: { id: string }) =>
            der.id === order.lineItems[0].vehicleProduct?.derivativeCapId,
        );
      const imageSrc =
        dataCars?.vehicleImages?.find(
          el =>
            el?.capId?.toString() ===
            order.lineItems[0].vehicleProduct?.derivativeCapId,
        ) ||
        dataCarsLCV?.vehicleImages?.find(
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
              onClick={() => onClickOrderBtn(order, order.leaseType)}
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

  const metaData = {
    canonicalUrl: null,
    legacyUrl: null,
    metaDescription: null,
    metaRobots: null,
    name: null,
    pageType: null,
    publishedOn: null,
    slug: null,
    title: `My ${quote ? 'Quotes' : 'Orders'} | Vanarama`,
    schema: null,
    breadcrumbs: null,
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
      {!data?.myOrders?.length && !loading ? (
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
                {hasCreditCompleteOrder() && renderChoiceBtn(1, 'Completed')}
                {hasCreditIncompleteOrder() &&
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
                    onChange={e => onChangeSortOrder(e.target.value)}
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
        </div>
      )}
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default MyOverview;
