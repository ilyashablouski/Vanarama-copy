import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFleetLandingPage } from './gql';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';

const FleetRequestCallBack = () => {
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

    return <>
    
    </>
}

export default FleetRequestCallBack;