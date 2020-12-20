import dynamic from 'next/dynamic';
import SchemaJSON from 'core/atoms/schema-json';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const InsuranceHeroSection = dynamic(
  () => import('./sections/InsuranceHeroSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const InsuranceTypesSection = dynamic(
  () => import('./sections/InsuranceTypesSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const MediaFeatureSection = dynamic(
  () => import('../FleetPageContainer/sections/MediaFeatureSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const MediaFeatureText = dynamic(() => import('./sections/MediaFeatureText'), {
  loading: () => <Skeleton count={5} />,
});
const InsuranceFAQSection = dynamic(
  () => import('./sections/InsuranceFAQSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const InsuranceNewsSection = dynamic(
  () => import('./sections/InsuranceNewsSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

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
