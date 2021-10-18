import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import Skeleton from '../../../components/Skeleton';

const League = dynamic(() => import('core/organisms/league'), {
  loading: () => <Skeleton count={2} />,
});

const DerangedLeagueSection = () => {
  return (
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
};

export default React.memo(DerangedLeagueSection);
