import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import Skeleton from '../Skeleton';

const League = dynamic(() => import('core/organisms/league'), {
  loading: () => <Skeleton count={2} />,
});

interface INationalLeagueBanner {
  dataUiTestId?: string;
}

const NationalLeagueBanner = ({ dataUiTestId }: INationalLeagueBanner) => (
  <section className="row:league" data-uitestid={dataUiTestId}>
    <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
      <League
        altText="vanarama national league"
        link="/fan-hub.html"
        dataUiTestId={dataUiTestId}
      />
    </LazyLoadComponent>
  </section>
);

export default NationalLeagueBanner;
