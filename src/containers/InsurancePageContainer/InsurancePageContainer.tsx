import React from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import ServiceBanner from 'core/molecules/service-banner';
import React from 'react';
import { GetInsuranceLandingPage } from '../../../generated/GetInsuranceLandingPage';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

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
  () => import('./sections/MediaFeatureSection'),
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
  serviceBanner?: IServiceBanner;
}

const InsurancePageContainer = ({
  data,
  serviceBanner,
}: IInsurancePageContainer) => {
  return (
    <>
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
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
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
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
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <InsuranceFAQSection
            {...data?.insuranceLandingPage?.sections?.featured2}
          />
        </LazyLoadComponent>
      )}
      {data?.insuranceLandingPage?.sections?.carousel && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <InsuranceNewsSection
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

export default InsurancePageContainer;
