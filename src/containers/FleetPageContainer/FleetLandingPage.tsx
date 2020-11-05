import React from 'react';
import HeroSection from './sections/HeroSection';
import LeadTextSection from './sections/LeadTextSection';
import TestimonialSection from './sections/TestimonialSection';
import MediaFeatureSection from './sections/MediaFeatureSection';
import BenefitsSection from './sections/BenefitsSection';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';

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
    </>
  );
};

export default FleetLandingPage;
