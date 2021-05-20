import Router from 'next/router';
import League from 'core/organisms/league';
import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

const NationalLeagueBanner = () => (
  <section className="row:league">
    <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
      <League
        clickReadMore={() => Router.push('/fan-hub.html')}
        altText="vanarama national league"
        link="/fan-hub.html"
      />
    </LazyLoadComponent>
  </section>
);

export default NationalLeagueBanner;
