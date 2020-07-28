import { useQuery } from "@apollo/client";
import { GetInsuranceLandingPage } from "../../../generated/GetInsuranceLandingPage";
import { GET_INSURANCE_LANDING_PAGE } from "./gql";
import Loading from "@vanarama/uibook/lib/components/atoms/loading";
import config from "./config";
import InsuranceHeroSection from "./sections/InsuranceHeroSection";
import InsuranceTypesSection from "./sections/InsuranceTypesSection";
import MediaFeatureSection from "../../containers/FleetPageContainer/sections/MediaFeatureSection";

const InsurancePageContainer = () => {
    const { data, error, loading } = useQuery<GetInsuranceLandingPage>(
        GET_INSURANCE_LANDING_PAGE,
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

    const {
        hero,
        leadText,
        featured1,
        featured2,
        cards
    } = data.insuranceLandingPage.sections;

    return (
        <>
            {hero && <InsuranceHeroSection {...hero} />}
            {cards && <InsuranceTypesSection {...cards} />}
            {featured1 && <MediaFeatureSection {...featured1} />}
        </>
    )
};

export default InsurancePageContainer;
