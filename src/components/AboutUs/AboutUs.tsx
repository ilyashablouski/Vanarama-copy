import React from "react";
import { useAboutUsPageData } from "./gql";
import Loading from "@vanarama/uibook/lib/components/atoms/loading";


const AboutUs: React.FC = () => {
    const { data, error, loading } = useAboutUsPageData();

    if (loading) {
        return <Loading size="large" />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!data) {
        return null;
    }

    console.log(data);

    return <p>Something happened</p>
}

export default AboutUs