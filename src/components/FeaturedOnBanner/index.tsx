import dynamic from 'next/dynamic';
import React from 'react'
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Skeleton from 'components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});

export const FeaturedOnBanner = () => (
  <LazyLoadComponent
    visibleByDefault={
      typeof window === 'undefined' ||
      navigator?.vendor === 'Apple Computer, Inc.'
    }
  >
    <section className="row:featured-logos">
      <Heading tag="span" size="small" color="darker">
        AS FEATURED ON
          </Heading>
      <div>
        {[
          {
            label: 'bbc',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/bbc.png`,
          },
          {
            label: 'btsport',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/btsport.png`,
          },
          {
            label: 'dailymail',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/dailymail.png`,
          },
          {
            label: 'dailymirror',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/dailymirror.png`,
          },
          {
            label: 'itv',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/itv.png`,
          },
          {
            label: 'metro',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/metro.png`,
          },
          {
            label: 'thesun',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/thesun.png`,
          },
          {
            label: 'sky',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/sky.png`,
          },
          {
            label: 'thetelegraph',
            href: `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured/thetelegraph.png`,
          },
        ].map(({ href, label }) => (
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            key={label}
            src={href}
            alt={label}
            size="expand"
            plain
          />
        ))}
      </div>
    </section>
  </LazyLoadComponent>
)
