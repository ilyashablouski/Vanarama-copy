import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFleetLandingPage } from './gql';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import HeroSection from './HeroSection';
import Hero, { HeroHeading, HeroTitle } from 'components/Hero';
import LeadTextSection from './LeadTextSection';
import TestimonialSection from './TestimonialSection';
import SideMediaFeature, { Side } from './SideMediaFeature';

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

    const { hero, leadText, featured2, featured3 } = data.fleetLandingPage.sections;

    return <>
        {hero && <HeroSection {...hero} />}
        {leadText && <LeadTextSection {...leadText} />}
        <TestimonialSection />
        {featured2 && <SideMediaFeature {...featured2} side={Side.left} />}
        {featured3 && <SideMediaFeature {...featured3} side={Side.right} />}
    </>
}

export default FleetLandingPage;