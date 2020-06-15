/* eslint-disable @typescript-eslint/camelcase */
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import OrderCard from '@vanarama/uibook/lib/components/molecules/cards/OrderCard/OrderCard';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import moment from 'moment';
import { NextPage } from 'next';
import React, { useState, CSSProperties } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import withApollo from '../../../hocs/withApollo';
import {
  useOrdersByPartyUuidData,
  useCarDerivativesData,
} from '../../../containers/OrdersInformation/gql';
import {
  VehicleTypeEnum,
  LeaseTypeEnum,
} from '../../../../generated/globalTypes';
import { GetDerivatives_derivatives } from '../../../../generated/GetDerivatives';
import { PARTY_BY_UUID } from '../my-details';
import {
  GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct,
  GetOrdersByPartyUuid_ordersByPartyUuid,
} from '../../../../generated/GetOrdersByPartyUuid';

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'My Account', href: '/account/my-details' },
    { label: 'My Orders', href: '/' },
  ],
};

const MyOrdersPage: NextPage = () => {
  const router = useRouter();
  const partyByUuid = (router.query.partyByUuid as string) || PARTY_BY_UUID;

  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [status, changeStatus] = useState(undefined as any);

  const { data, loading } = useOrdersByPartyUuidData(partyByUuid, status, [
    // 'quote',
  ]);

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
      el => el.aasmState === 'credit' && el.lineItems[0].state !== 'draft',
    );

  const hasCreditIncompleteOrder = () =>
    !!data?.ordersByPartyUuid.find(
      el => el.aasmState === 'credit' && el.lineItems[0].state === 'draft',
    );
  const countPages = () =>
    Math.ceil((data?.ordersByPartyUuid?.length || 0) / 6);
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const createOffersObject = (
    id: string,
    createdAt: string,
    leasType: string,
    offer: GetOrdersByPartyUuid_ordersByPartyUuid_lineItems_vehicleProduct,
    derivative?: GetDerivatives_derivatives,
  ) => {
    return {
      price: offer.monthlyPayment || 0,
      priceDescription: `Per Month ${
        leasType === LeaseTypeEnum.PERSONAL ? 'Inc' : 'Ex'
      }.VAT`,
      available: 'Now',
      initailRental: `£${offer.depositPayment} (${
        leasType === LeaseTypeEnum.PERSONAL ? 'inc.' : 'ex.'
      } VAT)`,
      contractLength: `${offer.depositMonths} month`,
      annualMileage: offer.annualMileage?.toString() || '',
      maintenance: offer.maintenance ? 'Yes' : 'No',
      fuel: derivative?.fuelTypeName || '',
      transmission: derivative?.transmissionName || '',
      color: offer.colour || '',
      trim: offer.trim || '',
      orderNumber: id,
      orderDate: moment(createdAt).format('DD.MM.YYYY'),
      orderButton: (
        <Button
          color="teal"
          label="View Orders"
          onClick={() => {
            router.push(
              leasType === LeaseTypeEnum.PERSONAL
                ? '/olaf/about'
                : '/b2b/olaf/about',
            );
          }}
        />
      ),
    };
  };

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab(value);
    switch (value) {
      case 1:
        changeStatus(['credit']);
        break;
      case 2:
        changeStatus(['credit', 'draft']);
        break;
      default:
        changeStatus([]);
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
      data?.ordersByPartyUuid.slice(indexOfFirstOffer, indexOfLastOffer) || [];
    return showOffers.map((el: GetOrdersByPartyUuid_ordersByPartyUuid) => {
      const derivative = dataCars?.data?.derivatives?.find(
        (der: { id: string }) => der.id,
      );
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
            el.lineItems[0].vehicleProduct!,
            derivative,
          )}
          header={{
            text: el.lineItems[0].state === 'draft' ? 'Incomplete' : 'Complete',
            complete: el.lineItems[0].state !== 'draft',
            incomplete: el.lineItems[0].state === 'draft',
          }}
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
          My Orders
        </Heading>
      </div>
      {!data?.ordersByPartyUuid?.length && !loading ? (
        <div
          className="dpd-content"
          style={{ minHeight: '40rem', display: 'flex', alignItems: 'center' }}
        >
          You have no Orders.
        </div>
      ) : (
        <div className="row:bg-lighter -thin">
          <div className="row:results">
            <div className="choiceboxes -teal">
              {renderChoiceBtn(0, 'All Orders')}
              {hasCreditCompleteOrder() && renderChoiceBtn(1, 'Complete')}
              {hasCreditIncompleteOrder() && renderChoiceBtn(2, 'Incomplete')}
            </div>
            {loading ? (
              <Loading size="large" />
            ) : (
              <>
                <div className="row:cards-1col">{renderOffers()}</div>

                <Pagination
                  path=""
                  pages={pages}
                  onClick={el => {
                    el.preventDefault();
                    setActivePage(+(el.target as Element).innerHTML);
                  }}
                  selected={activePage}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withApollo(MyOrdersPage);
