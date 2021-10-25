import React from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const HeroSection = dynamic(() => import('./sections/HeroSection'), {
  loading: () => <Skeleton count={5} />,
});

const LeadTextSection = dynamic(() => import('./sections/LeadTextSection'), {
  loading: () => <Skeleton count={5} />,
});

const TestimonialSection = dynamic(
  () => import('./sections/TestimonialSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

const MediaFeatureSection = dynamic(
  () => import('./sections/MediaFeatureSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

const BenefitsSection = dynamic(() => import('./sections/BenefitsSection'), {
  loading: () => <Skeleton count={5} />,
});

interface IFleetLandingPage {
  data: GenericPageQuery | undefined;
}

const FleetLandingPage = ({ data }: IFleetLandingPage) => {
  return (
    <>
      {data?.genericPage?.sections?.hero && (
        <HeroSection {...data?.genericPage?.sections?.hero} />
      )}
      {data?.genericPage?.sections?.leadText && (
        <LeadTextSection {...data?.genericPage?.sections?.leadText} />
      )}
      {data?.genericPage?.sections?.featured1 && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <TestimonialSection {...data?.genericPage?.sections?.featured1} />
        </LazyLoadComponent>
      )}
      {data?.genericPage?.sections?.featured2 && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <MediaFeatureSection {...data?.genericPage?.sections?.featured2} />
        </LazyLoadComponent>
      )}
      {data?.genericPage?.sections?.featured3 && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <MediaFeatureSection {...data?.genericPage?.sections?.featured3} />
        </LazyLoadComponent>
      )}
      {data?.genericPage?.sections?.featured4 && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <MediaFeatureSection {...data?.genericPage?.sections?.featured4} />
        </LazyLoadComponent>
      )}
      <hr className="-fullwidth" />
      {data?.genericPage?.sections?.tiles && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <BenefitsSection {...data?.genericPage?.sections?.tiles} />
        </LazyLoadComponent>
      )}
      {data?.genericPage.metaData && (
        <>
          <Head
            metaData={data?.genericPage.metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.genericPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export default FleetLandingPage;
