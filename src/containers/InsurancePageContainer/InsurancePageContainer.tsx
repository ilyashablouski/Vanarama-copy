import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import InsuranceHeroSection from './sections/InsuranceHeroSection';
import InsuranceTypesSection from './sections/InsuranceTypesSection';
import MediaFeatureSection from '../FleetPageContainer/sections/MediaFeatureSection';
import MediaFeatureText from './sections/MediaFeatureText';
import InsuranceFAQSection from './sections/InsuranceFAQSection';
import InsuranceNewsSection from './sections/InsuranceNewsSection';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';
import Head from '../../components/Head/Head';

interface IInsurancePageContainer {
  data: GetInsuranceLandingPage | undefined;
}

const InsurancePageContainer = ({ data }: IInsurancePageContainer) => {
  return (
    <>
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
      {data?.insuranceLandingPage.metaData && (
        <>
          <Head
            metaData={data?.insuranceLandingPage.metaData}
            featuredImage={data?.insuranceLandingPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.insuranceLandingPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export default InsurancePageContainer;
