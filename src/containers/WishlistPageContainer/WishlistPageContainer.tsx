import React, { useState } from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

import WishlistOfferCard from 'core/molecules/cards/WishlistOfferCard';

import Breadcrumb from 'components/Breadcrumb';
import { IWishlistContainer } from './interface';
import WishlistRegistration from './WishlistRegistration';

function WishlistPageContainer({
  pageTitle,
  breadcrumbsList,
}: IWishlistContainer) {
  const [person] = useState(null);
  const [wishlistItems] = useState([]);

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsList} />
        <Heading tag="h1" size="xlarge" color="black">
          {pageTitle}
        </Heading>
      </div>
      <section className="row:bg-lighter -thin -pv-500">
        {wishlistItems.length && !person && (
          <WishlistRegistration className="-mb-500" />
        )}
        <div className="row:cards-1col">
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
        </div>
        <div className="row:cards-3col">
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
        </div>
      </section>
    </>
  );
}

export default WishlistPageContainer;
