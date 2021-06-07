import React, { useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

import WishlistOfferCard from 'core/molecules/cards/WishlistOfferCard';
import WishlistPlaceholderCard from 'core/molecules/cards/WishlistPlaceholderCard';

import Breadcrumb from 'components/Breadcrumb';
import { IWishlistContainer } from './interface';
import WishlistRegistration from './WishlistRegistration';

import { GetPerson } from '../../../generated/GetPerson';
import { ProductCardData } from '../../../generated/ProductCardData';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

function WishlistPageContainer({
  pageTitle,
  breadcrumbsList,
}: IWishlistContainer) {
  const [person] = useState<GetPerson | null>(null);
  const [wishlistItems] = useState<ProductCardData | null>(null);

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
          <>
            {!person && <WishlistRegistration className="-mb-500" />}
            <section className="row:cards-3col">
              {wishlistItems.productCarousel.map((item, index) => (
                <LazyLoadComponent
                  key={item?.capId || index}
                  visibleByDefault={isServerRenderOrAppleDevice}
                >
                  <WishlistPlaceholderCard />
                </LazyLoadComponent>
              ))}
            </section>
          </>
        ) : (
          <>
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
              <WishlistOfferCard
                label="Vans"
                imageUrl="https://shorturl.at/juN89"
                link={{
                  href: '/special-offers.html',
                  label: 'Vans',
                }}
              />
              <WishlistOfferCard
                label="Pickups"
                imageUrl="https://shorturl.at/juN89"
                link={{
                  href: '/pickup-special-offers.html',
                  label: 'Pickups',
                }}
              />
              <WishlistOfferCard
                label="Cars"
                imageUrl="https://shorturl.at/juN89"
                link={{
                  href: '/car-leasing-special-offers.html',
                  label: 'Cars',
                }}
              />
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default WishlistPageContainer;
