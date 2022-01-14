import dynamic from 'next/dynamic';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Skeleton from '../Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});

const baseImagePath = `${process.env.HOST_DOMAIN}/Assets/images-optimised/home/featured`;
const featuredImageList = [
  {
    alt: 'bbc',
    src: `${baseImagePath}/bbc.png`,
    width: 135,
    height: 47,
  },
  {
    alt: 'btsport',
    src: `${baseImagePath}/btsport.png`,
    width: 128,
    height: 53,
  },
  {
    alt: 'dailymail',
    src: `${baseImagePath}/dailymail.png`,
    width: 92,
    height: 55,
  },
  {
    alt: 'dailymirror',
    src: `${baseImagePath}/dailymirror.png`,
    width: 105,
    height: 30,
  },
  {
    alt: 'itv',
    src: `${baseImagePath}/itv.png`,
    width: 85,
    height: 43,
  },
  {
    alt: 'metro',
    src: `${baseImagePath}/metro.png`,
    width: 127,
    height: 38,
  },
  {
    alt: 'thesun',
    src: `${baseImagePath}/thesun.png`,
    width: 109,
    height: 47,
  },
  {
    alt: 'sky',
    src: `${baseImagePath}/sky.png`,
    width: 112,
    height: 79,
  },
  {
    alt: 'thetelegraph',
    src: `${baseImagePath}/thetelegraph.png`,
    width: 125,
    height: 58,
  },
];

const FeaturedOnBanner = () => (
  <section className="row:featured-logos">
    <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
      <Heading tag="span" size="small" color="darker">
        AS FEATURED ON
      </Heading>
      <div>
        {featuredImageList.map(({ width, height, src, alt }) => (
          <ImageV2
            key={alt}
            width={width}
            height={height}
            src={src}
            alt={alt}
            size="expand"
            plain
          />
        ))}
      </div>
    </LazyLoadComponent>
  </section>
);

export default FeaturedOnBanner;
