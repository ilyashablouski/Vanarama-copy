import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useQuery } from '@apollo/client';
import GET_FLEET_PAGE_CONTENT from './gql';
import HeroSection from './sections/HeroSection';
import LeadTextSection from './sections/LeadTextSection';
import TestimonialSection from './sections/TestimonialSection';
import MediaFeatureSection from './sections/MediaFeatureSection';
import BenefitsSection from './sections/BenefitsSection';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';
import config from './config';
import Head from '../../components/Head/Head';

const FleetLandingPage = () => {
  const { data, error, loading } = useQuery<GetFleetLandingPage>(
    GET_FLEET_PAGE_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>{config.errorMessage.replace('{{error}}', error.message)}</p>;
  }

  if (!data) {
    return <></>;
  }

  const metaData = data?.fleetLandingPage?.metaData;

  return (
    <>
      <Head
        title={metaData?.title || ''}
        metaDescription={metaData?.metaDescription}
        metaRobots={metaData?.metaRobots}
        legacyUrl={metaData?.legacyUrl}
        publishedOn={metaData?.publishedOn}
        featuredImage={data?.fleetLandingPage?.featuredImage}
      />
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
    </>
  );
};

export default FleetLandingPage;
