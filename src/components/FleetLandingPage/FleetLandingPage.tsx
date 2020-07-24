import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { GET_FLEET_PAGE_CONTENT } from './gql';
import HeroSection from './sections/Hero/HeroSection';
import LeadTextSection from './sections/LeadTextSection';
import TestimonialSection from './sections/TestimonialSection';
import MediaFeatureSection from './sections/MediaFeatureSection';
import BenefitsSection from './sections/BenefitsSection';
import { useQuery } from '@apollo/client';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';

const FleetLandingPage = () => {
  const { data, error, loading } = useQuery<GetFleetLandingPage, {}>(GET_FLEET_PAGE_CONTENT);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  const {
    hero,
    leadText,
    featured1,
    featured2,
    featured3,
    featured4,
    tiles,
  } = data.fleetLandingPage.sections;

  return (
    <>
      {/* {hero && <HeroSection {...hero} />}
      {leadText && <LeadTextSection {...leadText} />}
      {featured1 && <TestimonialSection {...featured1} />}
      {featured2 && <MediaFeatureSection {...featured2} />}
      {featured3 && <MediaFeatureSection {...featured3} />}
      {featured4 && <MediaFeatureSection {...featured4} />} */}
      <hr className="-fullwidth" />
      {/* {tiles && <BenefitsSection {...tiles} />} */}
    </>
  );
};

export default FleetLandingPage;
