import React from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

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
  data: GetFleetLandingPage | undefined;
}

const FleetLandingPage = ({ data }: IFleetLandingPage) => {
  return (
    <>
      {data?.fleetLandingPage.metaData && (
        <>
          <Head
            metaData={data?.fleetLandingPage.metaData}
            featuredImage={data?.fleetLandingPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.fleetLandingPage.metaData.schema)}
          />
        </>
      )}
      {data?.fleetLandingPage?.sections?.hero && (
        <HeroSection {...data?.fleetLandingPage?.sections?.hero} />
      )}
      {data?.fleetLandingPage?.sections?.leadText && (
        <LeadTextSection {...data?.fleetLandingPage?.sections?.leadText} />
      )}
      {data?.fleetLandingPage?.sections?.featured1 && (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <TestimonialSection
            {...data?.fleetLandingPage?.sections?.featured1}
          />
        </LazyLoadComponent>
      )}
      {data?.fleetLandingPage?.sections?.featured2 && (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <MediaFeatureSection
            {...data?.fleetLandingPage?.sections?.featured2}
          />
        </LazyLoadComponent>
      )}
      {data?.fleetLandingPage?.sections?.featured3 && (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <MediaFeatureSection
            {...data?.fleetLandingPage?.sections?.featured3}
          />
        </LazyLoadComponent>
      )}
      {data?.fleetLandingPage?.sections?.featured4 && (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <MediaFeatureSection
            {...data?.fleetLandingPage?.sections?.featured4}
          />
        </LazyLoadComponent>
      )}
      <hr className="-fullwidth" />
      {data?.fleetLandingPage?.sections?.tiles && (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <BenefitsSection {...data?.fleetLandingPage?.sections?.tiles} />
        </LazyLoadComponent>
      )}
    </>
  );
};

export default FleetLandingPage;
