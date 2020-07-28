import { useQuery } from '@apollo/client';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';
import GET_INSURANCE_LANDING_PAGE from './gql';
import config from './config';
import InsuranceHeroSection from './sections/InsuranceHeroSection';
import InsuranceTypesSection from './sections/InsuranceTypesSection';
import MediaFeatureSection from '../FleetPageContainer/sections/MediaFeatureSection';
import MediaFeatureText from './sections/MediaFeatureText';
import InsuranceFAQSection from './sections/InsuranceFAQSection';
import InsuranceNewsSection from './sections/InsuranceNewsSection';

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
    featured1,
    featured2,
    cards,
    carousel,
  } = data.insuranceLandingPage.sections;

  return (
    <>
      {hero && <InsuranceHeroSection {...hero} />}
      {cards && <InsuranceTypesSection {...cards} />}
      {featured1 && (
        <MediaFeatureSection {...featured1} imageOnly>
          <MediaFeatureText {...featured1} />
        </MediaFeatureSection>
      )}
      <hr className="-fullwidth" />
      {featured2 && <InsuranceFAQSection {...featured2} />}
      {carousel && <InsuranceNewsSection {...carousel} />}
    </>
  );
};

export default InsurancePageContainer;
