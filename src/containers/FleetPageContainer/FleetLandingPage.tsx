import React from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from 'core/atoms/schema-json';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery_genericPage as IGenericPage } from '../../../generated/GenericPageQuery';

const HeroSection = dynamic(() => import('./sections/HeroSection'), {
  loading: () => <Skeleton count={1} />,
});

const HeadingSection = dynamic(
  () => import('../../components/HeadingSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const TestimonialSection = dynamic(
  () => import('./sections/TestimonialSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const FeaturedSection = dynamic(
  () => import('../../components/FeaturedSection'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

const WhyLeaseWithVanaramaTiles = dynamic(
  () => import('../../components/WhyLeaseWithVanaramaTiles'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IFleetLandingPage {
  genericPage: IGenericPage;
}

const FleetLandingPage = ({ genericPage }: IFleetLandingPage) => {
  const { hero, leadText, featured1, featured2, featured3, featured4, tiles } =
    genericPage.sections || {};
  const { metaData, featuredImage } = genericPage;
  return (
    <>
      {hero && (
        <HeroSection
          heroLabel={hero.heroLabel}
          title={hero.title}
          body={hero.body}
          image={hero.image}
        />
      )}
      {leadText && (
        <HeadingSection
          titleTag={leadText.titleTag}
          header={leadText.heading}
          description={leadText.description}
        />
      )}
      {featured1 && <TestimonialSection featured={featured1} />}
      {featured2 && <FeaturedSection featured={featured2} />}
      {featured3 && <FeaturedSection featured={featured3} />}
      {featured4 && <FeaturedSection featured={featured4} />}
      <hr className="-fullwidth" />
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          title={tiles.tilesTitle || ''}
          tiles={tiles.tiles || []}
        />
      )}
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default FleetLandingPage;
