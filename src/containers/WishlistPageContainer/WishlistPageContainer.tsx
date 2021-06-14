import React, { useEffect, useMemo, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';
import Modal from 'core/molecules/modal';
import Heading from 'core/atoms/heading';
import Loading from 'core/atoms/loading';

import Breadcrumb from 'components/Breadcrumb';

import { IWishlistContainer } from './interface';

import usePerson from '../../hooks/usePerson';
import useWishlist from '../../hooks/useWishlist';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { useVehiclesTotalCount } from '../../gql/vehiclesTotalCount';
import {
  RESULTS_PER_REQUEST,
  sortObjectGenerator,
} from '../SearchPageContainer/helpers';
import {
  createOfferCards,
  getDefaultSortOrder,
  getNewSortOrder,
  getProductPlaceholderList,
  getSortValues,
  sortProductList,
} from './helpers';

import SortOrder from '../../components/SortOrder';
import WishlistProductCard from '../../components/VehicleCard';

const WishlistOfferCard = dynamic(() => import('./WishlistOfferCard'));
const WishlistEmptyMessage = dynamic(() => import('./WishlistEmptyMessage'));
const WishlistRegistration = dynamic(() => import('./WishlistRegistration'));
const WishlistProductPlaceholder = dynamic(() =>
  import('./WishlistProductPlaceholder'),
);

function WishlistPageContainer({
  pageTitle,
  breadcrumbsList,
}: IWishlistContainer) {
  const { personLoggedIn } = usePerson();
  const { wishlistVehicles, wishlistInitialized } = useWishlist();

  const [getCarsOffers, carsOptions] = useVehiclesTotalCount(
    VehicleTypeEnum.CAR,
  );
  const [getVansOffers, vansOptions] = useVehiclesTotalCount(
    VehicleTypeEnum.LCV,
  );
  const [
    getPickupsOffers,
    pickupsOptions,
  ] = useVehiclesTotalCount(VehicleTypeEnum.LCV, ['Pickup']);

  const vansTotalCount = vansOptions.data?.vehicleList.totalCount;
  const pickupsTotalCount = pickupsOptions.data?.vehicleList.totalCount;
  const carsTotalCount = carsOptions.data?.vehicleList.totalCount;
  const cardList = useMemo(
    () => createOfferCards(vansTotalCount, pickupsTotalCount, carsTotalCount),
    [vansTotalCount, pickupsTotalCount, carsTotalCount],
  );

  useEffect(() => {
    getCarsOffers();
    getPickupsOffers();
    getVansOffers();
  }, [getCarsOffers, getPickupsOffers, getVansOffers]);

  const [isModalVisible, setModalVisibility] = useState(false);
  const [sortOrder, setSortOrder] = useState(getDefaultSortOrder());
  const [cardsPerPage, setCardsPerPage] = useState(RESULTS_PER_REQUEST);

  function handleChangeSortOrder(value: string) {
    const [type, direction] = value.split('_');

    setSortOrder(sortObjectGenerator(getNewSortOrder(type, direction)));
    setCardsPerPage(RESULTS_PER_REQUEST);
  }

  function handleClickLoadMore() {
    setCardsPerPage(cardsPerPage + RESULTS_PER_REQUEST);
  }

  const sortedProductList = useMemo(
    () => sortProductList(wishlistVehicles, sortOrder[0]),
    [sortOrder, wishlistVehicles],
  );
  const productPlaceholderList = useMemo(
    () => getProductPlaceholderList(wishlistVehicles.length),
    [wishlistVehicles.length],
  );

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsList} />
        <Heading tag="h1" size="xlarge" color="black">
          {pageTitle}
        </Heading>
      </div>
      <div className="row:bg-lighter wishlist -thin -pv-500">
        {wishlistInitialized ? (
          <>
            {!personLoggedIn && <WishlistRegistration className="-mb-500" />}
            {sortedProductList.length ? (
              <div className="row:results">
                <Text color="darker" size="regular" tag="span">
                  Showing {wishlistVehicles.length} Vehicles
                </Text>
                <SortOrder
                  sortOrder={sortOrder[0]}
                  sortValues={getSortValues()}
                  isSpecialOffersOrder={false}
                  onChangeSortOrder={handleChangeSortOrder}
                />
                <section className="row:cards-3col">
                  {sortedProductList
                    .slice(0, cardsPerPage)
                    .map((card, index) => {
                      const cardUrl = card.pageUrl?.url ?? '';
                      const cardTitle = {
                        title: `${card.manufacturerName} ${card.modelName}`,
                        description: card.derivativeName ?? '',
                      };

                      return (
                        <LazyLoadComponent
                          key={card.capId || index}
                          visibleByDefault={isServerRenderOrAppleDevice}
                        >
                          <WishlistProductCard
                            data={card}
                            isPersonalPrice
                            bodyStyle={card.bodyStyle}
                            title={cardTitle}
                            url={cardUrl}
                          />
                        </LazyLoadComponent>
                      );
                    })}
                  {productPlaceholderList.map((placeholder, index) => (
                    <LazyLoadComponent
                      key={placeholder.capId || index}
                      visibleByDefault={isServerRenderOrAppleDevice}
                    >
                      <WishlistProductPlaceholder
                        onClick={() => setModalVisibility(true)}
                      />
                    </LazyLoadComponent>
                  ))}
                </section>
                {sortedProductList.length > cardsPerPage && (
                  <div className="pagination">
                    <Button
                      color="teal"
                      size="regular"
                      fill="outline"
                      label="Load More"
                      dataTestId="LoadMore"
                      onClick={handleClickLoadMore}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="row">
                <WishlistEmptyMessage className="-mb-400" />
                <section className="row:cards-3col">
                  {cardList.map(card => (
                    <WishlistOfferCard
                      key={card.header}
                      label={card.header}
                      imageUrl={card.imageSrc}
                      totalCount={card.totalCount}
                      onClick={() => Router.push(card.redirect)}
                      textSize="regular"
                      iconSize="large"
                    />
                  ))}
                </section>
              </div>
            )}
          </>
        ) : (
          <div className="-flex-h -h-400">
            <Loading size="large" />
          </div>
        )}
      </div>
      {isModalVisible && (
        <Modal show onRequestClose={() => setModalVisibility(false)}>
          <div className="-justify-content-row -w-300 -a-center">
            <Heading tag="span" color="black">
              Choose your vehicle type
            </Heading>
          </div>
          {cardList.map(card => (
            <WishlistOfferCard
              key={card.header}
              className="-mt-400"
              label={card.header}
              imageUrl={card.imageSrc}
              totalCount={card.totalCount}
              onClick={() => Router.push(card.redirect)}
              textSize="small"
              iconSize="lead"
            />
          ))}
        </Modal>
      )}
    </>
  );
}

export default WishlistPageContainer;
