import Router from 'next/router';
import League from 'core/organisms/league';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const NationalLeagueBanner = () => (
  <section className="row:league">
    <LazyLoadComponent
      visibleByDefault={
        typeof window === 'undefined' ||
        navigator?.vendor === 'Apple Computer, Inc.'
      }
    >
      <League
        clickReadMore={() => Router.push('/fan-hub.html')}
        altText="vanarama national league"
        link="/fan-hub.html"
      />
    </LazyLoadComponent>
  </section>
);

export default NationalLeagueBanner;
