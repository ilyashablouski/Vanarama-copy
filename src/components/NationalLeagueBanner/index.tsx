import Router from 'next/router';
import League from 'core/organisms/league';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export const NationalLeagueBanner = () => (
  <LazyLoadComponent
    visibleByDefault={
      typeof window === 'undefined' ||
      navigator?.vendor === 'Apple Computer, Inc.'
    }
  >
    <section className="row:league">
      <League
        clickReadMore={() => Router.push('/fan-hub.html')}
        altText="vanarama national league"
        link="/fan-hub.html"
      />
    </section>
  </LazyLoadComponent>
);
