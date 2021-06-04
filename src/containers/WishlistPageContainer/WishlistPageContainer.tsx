import React from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';

import { IWishlistContainer } from './interface';
import Breadcrumb from '../../components/Breadcrumb';
import RouterLink from '../../components/RouterLink';

function WishlistPageContainer({
  pageTitle,
  breadcrumbsList,
}: IWishlistContainer) {
  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsList} />
        <Heading tag="h1" size="xlarge" color="black">
          {pageTitle}
        </Heading>
      </div>
      <section className="row:bg-lighter -thin">
        <div className="row:cards-1col">
          <div className="card -place-center -h-300">
            <div className="row:lead-text">
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
          <RouterLink className="card" link={{ href: '', label: '' }}>
            <Heading size="large" color="black">
              Vans
            </Heading>
            <Text size="regular" color="darker">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus nam nesciunt quidem rerum.
            </Text>
          </RouterLink>
          <RouterLink className="card" link={{ href: '', label: '' }}>
            <Heading size="large" color="black">
              Pickups
            </Heading>
            <Text size="regular" color="darker">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus nam nesciunt quidem rerum.
            </Text>
          </RouterLink>
          <RouterLink className="card" link={{ href: '', label: '' }}>
            <Heading size="large" color="black">
              Cars
            </Heading>
            <Text size="regular" color="darker">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus nam nesciunt quidem rerum.
            </Text>
          </RouterLink>
        </div>
      </section>
    </>
  );
}

export default WishlistPageContainer;
