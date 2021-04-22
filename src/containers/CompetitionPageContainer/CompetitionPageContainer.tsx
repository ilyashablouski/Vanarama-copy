import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const CompetitionHeroSection = dynamic(
  () => import('./sections/CompetitionHeroSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const CompetitionTypesSection = dynamic(
  () => import('./sections/CompetitionTypesSection'),
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
const CompetitionFAQSection = dynamic(
  () => import('./sections/CompetitionFAQSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const CompetitionNewsSection = dynamic(
  () => import('./sections/CompetitionNewsSection'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

interface ICompetitionPageContainer {
  data: GetInsuranceLandingPage | undefined;
}

const CompetitionPageContainer = ({ data }: ICompetitionPageContainer) => {
  return (
    <>
      {data?.insuranceLandingPage?.sections?.hero && (
        <CompetitionHeroSection
          {...data?.insuranceLandingPage?.sections?.hero}
        />
      )}
      {data?.insuranceLandingPage?.sections?.cards && (
        <CompetitionTypesSection
          {...data?.insuranceLandingPage?.sections?.cards}
        />
      )}
      {data?.insuranceLandingPage?.sections?.featured1 && (
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <MediaFeatureSection
            {...data?.insuranceLandingPage?.sections?.featured1}
            imageOnly
          >
            <MediaFeatureText
              {...data?.insuranceLandingPage?.sections?.featured1}
            />
          </MediaFeatureSection>
        </LazyLoadComponent>
      )}
      <hr className="-fullwidth" />
      {data?.insuranceLandingPage?.sections?.featured2 && (
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <CompetitionFAQSection
            {...data?.insuranceLandingPage?.sections?.featured2}
          />
        </LazyLoadComponent>
      )}
      {data?.insuranceLandingPage?.sections?.carousel && (
        <LazyLoadComponent
          visibleByDefault={
            typeof window === 'undefined' ||
            navigator?.vendor === 'Apple Computer, Inc.'
          }
        >
          <CompetitionNewsSection
            {...data?.insuranceLandingPage?.sections?.carousel}
          />
        </LazyLoadComponent>
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

export default CompetitionPageContainer;
