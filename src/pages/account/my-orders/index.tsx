import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { NextPage } from 'next';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import cx from 'classnames';
import RouterLink from '../../../components/RouterLink/RouterLink';
import withApollo from '../../../hocs/withApollo';
import { useOrdersByPartyUuidData } from '../../../containers/OrdersInformation/gql';

interface IProps {}

const PATH = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'My Account', href: '/account/my-details' },
    { label: 'My Orders', href: '/' },
  ],
};

export const MyOrdersPage: NextPage<IProps> = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const [status, changeStatus] = useState([]);
  const { data, loading } = useOrdersByPartyUuidData(
    '894096e9-7536-4ee7-aac3-2f209681d904',
    status,
    // 'quote',
  );

  if (!data) {
    return null;
  }

  const onChangeTabs = (value: React.SetStateAction<number>) => {
    setActiveTab(value);
    switch (value) {
      case 1:
      case 2:
        changeStatus(['credit']);
        break;
      default:
        changeStatus(['credit', 'new']);
        break;
    }
  };

  const hasCreditOrder = () =>
    !!data?.ordersByPartyUuid.find(el => el.aasmState === 'credit');

  const countPages = () => Math.ceil(data?.ordersByPartyUuid.length / 6);

  const renderChoiceBtn = (index: number, text: string) => (
    <button
      className={cx('choicebox', { '-active': activeTab === index })}
      onClick={() => onChangeTabs(index)}
      type="button"
    >
      {text}
    </button>
  );

  const renderOffers = () => {
    const indexOfLastOffer = activePage * 6;
    const indexOfFirstOffer = indexOfLastOffer - 6;
    const showOffers = data?.ordersByPartyUuid.slice(
      indexOfFirstOffer,
      indexOfLastOffer,
    );
    return showOffers.map((el: any) => (
      <Card
        key={el.id}
        title={{
          title: el.lineItems[0].vehicleProduct.title || '',
          description: el.lineItems[0].vehicleProduct.description,
        }}
      >
        <RouterLink
          classNames={{
            color: 'teal',
          }}
          link={{ href: '/', label: '' }}
        >
          View Orders
        </RouterLink>
      </Card>
    ));
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
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <div className="choiceboxes -teal">
            {renderChoiceBtn(0, 'All Orders')}
            {hasCreditOrder() && (
              <>
                {renderChoiceBtn(1, 'Complete')}
                {renderChoiceBtn(2, 'Incomplete')}
              </>
            )}
          </div>
          {loading ? (
            <Loading size="large" />
          ) : (
            <div className="row:cards-1col">{renderOffers()}</div>
          )}

          <ReactPaginate
            pageCount={countPages()}
            pageRangeDisplayed={3}
            onPageChange={(page: { selected: number }) =>
              setActivePage(page.selected + 1)
            }
            previousLabel={null}
            nextLabel={null}
            containerClassName="pagination"
            pageLinkClassName="link -regular -clear"
            activeLinkClassName="-teal"
            marginPagesDisplayed={0}
          />
        </div>
      </div>
    </>
  );
};

export default withApollo(MyOrdersPage);
