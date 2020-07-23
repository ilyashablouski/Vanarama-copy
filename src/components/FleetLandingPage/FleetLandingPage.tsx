import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFleetLandingPage } from './gql';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import HeroSection from './sections/HeroSection';
import Hero, { HeroHeading, HeroTitle } from 'components/Hero';
import LeadTextSection from './sections/LeadTextSection';
import TestimonialSection from './sections/TestimonialSection';
import SideMediaFeature, { Side } from './sections/SideMediaFeature';
import BenefitsSection from './sections/BenefitsSection';

const FleetLandingPage = () => {
    const { data, error, loading } = useFleetLandingPage();

    if (loading) {
        return <Loading size="large" />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!data) {
        return <></>;
    }

    const { hero, leadText, featured1, featured2, featured3, featured4, tiles } = data.fleetLandingPage.sections;

    return <>
        {hero && <HeroSection {...hero} />}
        {leadText && <LeadTextSection {...leadText} />}
        {featured1 && <TestimonialSection {...featured1} />}
        {featured2 && <SideMediaFeature {...featured2} side={Side.left} />}
        {featured3 && <SideMediaFeature {...featured3} side={Side.right} />}
        {featured4 && <SideMediaFeature {...featured4} side={Side.left} />}
        <hr className="-fullwidth" />
        {tiles && <BenefitsSection {...tiles} />}
    </>
}

export default FleetLandingPage;