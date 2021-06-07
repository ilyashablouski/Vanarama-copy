import React, { useEffect, useMemo, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';

import Text from 'core/atoms/text';
import Modal from 'core/molecules/modal';
import Heading from 'core/atoms/heading';

import Breadcrumb from 'components/Breadcrumb';

import { IWishlistContainer } from './interface';
import WishlistOfferCard from './WishlistOfferCard';
import WishlistRegistration from './WishlistRegistration';
import WishlistProductPlaceholder from './WishlistProductPlaceholder';

import usePerson from '../../hooks/usePerson';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { ProductCardData } from '../../../generated/ProductCardData';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { useVehiclesTotalCount } from '../../gql/vehiclesTotalCount';

const VAN_SEARCH_URL = '/special-offers.html';
const CAR_SEARCH_URL = '/car-leasing-special-offers.html';
const PICKUP_SEARCH_URL = '/pickup-special-offers.html';

const createOfferCards = (
  vansOffersCount: number = 0,
  pickupsOffersCount: number = 0,
  carsOffersCount: number = 0,
) => [
  {
    header: 'Vans',
    imageSrc: `${process.env.HOST_DOMAIN}/Assets/images/comparator/modal/cap-51392-171678.png`,
    redirect: VAN_SEARCH_URL,
    totalCount: vansOffersCount,
  },
  {
    header: 'Pickups',
    imageSrc: `${process.env.HOST_DOMAIN}/Assets/images/comparator/modal/cap-44067-160978.png`,
    redirect: PICKUP_SEARCH_URL,
    totalCount: pickupsOffersCount,
  },
  {
    header: 'Cars',
    imageSrc: `${process.env.HOST_DOMAIN}/Assets/images/comparator/modal/cap-88928-161019.png`,
    redirect: CAR_SEARCH_URL,
    totalCount: carsOffersCount,
  },
];

function WishlistPageContainer({
  pageTitle,
  breadcrumbsList,
}: IWishlistContainer) {
  const { personLoggedIn } = usePerson();

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

  const [wishlistItems] = useState<ProductCardData | null>();
  const [isModalVisible, setModalVisibility] = useState(false);

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsList} />
        <Heading tag="h1" size="xlarge" color="black">
          {pageTitle}
        </Heading>
      </div>
      <div className="row:bg-lighter -thin -pv-500">
        {wishlistItems?.productCarousel?.length ? (
          <div className="wishlist">
            {!personLoggedIn && <WishlistRegistration className="-mb-500" />}
            <section className="row:cards-3col">
              {wishlistItems.productCarousel.map((item, index) => (
                <LazyLoadComponent
                  key={item?.capId || index}
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <WishlistProductPlaceholder
                    onClick={() => setModalVisibility(true)}
                  />
                </LazyLoadComponent>
              ))}
            </section>
          </div>
        ) : (
          <div className="wishlist">
            <section className="row:cards-1col">
              <div className="card -flex-h -h-300">
                <div className="row:lead-text -m-300">
                  <Text className="-semi-b" size="lead" color="darker">
                    Your wishlist is empty right now.
                  </Text>
                  <Heading size="lead" color="darker">
                    Want to add vehicles to your wishlist? View the latest hot
                    offers below.
                  </Heading>
                </div>
              </div>
            </section>
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
      </div>
      {isModalVisible && (
        <Modal show onRequestClose={() => setModalVisibility(false)}>
          <div className="-justify-content-row -w-300 -a-center">
            <Heading tag="span" color="black">
              Choose the type of vehicle are you looking for?
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
