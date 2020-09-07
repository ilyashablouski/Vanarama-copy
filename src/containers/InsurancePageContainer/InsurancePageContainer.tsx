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
import Head from '../../components/Head/Head';

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

  const metaData = data?.insuranceLandingPage?.metaData;

  return (
    <>
      <Head
        title={metaData?.title || ''}
        metaDescription={metaData?.metaDescription}
        metaRobots={metaData?.metaRobots}
        legacyUrl={metaData?.legacyUrl}
        publishedOn={metaData?.publishedOn}
        featuredImage={data?.insuranceLandingPage?.featuredImage}
      />
      {data?.insuranceLandingPage?.sections?.hero && (
        <InsuranceHeroSection {...data?.insuranceLandingPage?.sections?.hero} />
      )}
      {data?.insuranceLandingPage?.sections?.cards && (
        <InsuranceTypesSection
          {...data?.insuranceLandingPage?.sections?.cards}
        />
      )}
      {data?.insuranceLandingPage?.sections?.featured1 && (
        <MediaFeatureSection
          {...data?.insuranceLandingPage?.sections?.featured1}
          imageOnly
        >
          <MediaFeatureText
            {...data?.insuranceLandingPage?.sections?.featured1}
          />
        </MediaFeatureSection>
      )}
      <hr className="-fullwidth" />
      {data?.insuranceLandingPage?.sections?.featured2 && (
        <InsuranceFAQSection
          {...data?.insuranceLandingPage?.sections?.featured2}
        />
      )}
      {data?.insuranceLandingPage?.sections?.carousel && (
        <InsuranceNewsSection
          {...data?.insuranceLandingPage?.sections?.carousel}
        />
      )}
    </>
  );
};

export default InsurancePageContainer;
