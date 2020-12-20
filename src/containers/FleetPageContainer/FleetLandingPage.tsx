import React from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
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
      {data?.fleetLandingPage?.sections?.hero && (
        <HeroSection {...data?.fleetLandingPage?.sections?.hero} />
      )}
      {data?.fleetLandingPage?.sections?.leadText && (
        <LeadTextSection {...data?.fleetLandingPage?.sections?.leadText} />
      )}
      {data?.fleetLandingPage?.sections?.featured1 && (
        <TestimonialSection {...data?.fleetLandingPage?.sections?.featured1} />
      )}
      {data?.fleetLandingPage?.sections?.featured2 && (
        <MediaFeatureSection {...data?.fleetLandingPage?.sections?.featured2} />
      )}
      {data?.fleetLandingPage?.sections?.featured3 && (
        <MediaFeatureSection {...data?.fleetLandingPage?.sections?.featured3} />
      )}
      {data?.fleetLandingPage?.sections?.featured4 && (
        <MediaFeatureSection {...data?.fleetLandingPage?.sections?.featured4} />
      )}
      <hr className="-fullwidth" />
      {data?.fleetLandingPage?.sections?.tiles && (
        <BenefitsSection {...data?.fleetLandingPage?.sections?.tiles} />
      )}
      <SchemaJSON
        json={JSON.stringify(data?.fleetLandingPage?.metaData?.schema)}
      />
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
    </>
  );
};

export default FleetLandingPage;
