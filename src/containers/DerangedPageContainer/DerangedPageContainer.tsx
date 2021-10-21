import React from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from 'core/atoms/schema-json';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { GetConversionsVehicleList_conversions as ConversionsVehicleList } from '../../../generated/GetConversionsVehicleList';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const DerangedVehicleSection = dynamic(
  () => import('./sections/DerangedVehicleSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const FeaturedSection = dynamic(
  () => import('../../components/FeaturedSection'),
  {
    loading: () => <Skeleton count={4} />,
  },
);

const WhyLeaseWithVanaramaTiles = dynamic(
  () => import('../../components/WhyLeaseWithVanaramaTiles'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const NationalLeagueBanner = dynamic(
  () => import('../../components/NationalLeagueBanner'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IDerangedPageContainer {
  genericPage?: GenericPageQuery;
  conversions: (ConversionsVehicleList | null)[] | null;
}

const DerangedPageContainer: React.FC<IDerangedPageContainer> = props => {
  const genericPage = getSectionsData(['genericPage'], props);
  const conversions = getSectionsData(['conversions'], props);
  const metaData = getSectionsData(['metaData'], genericPage?.genericPage);
  const { hero, featured1, featured2, featured3, featured4, tiles } =
    genericPage?.genericPage?.sections || {};

  return (
    <>
      {hero && (
        <DerangedHeroSection
          title={hero.title || ''}
          body={hero.body || ''}
          image={hero.image}
        />
      )}
      {conversions && conversions?.length > 0 && (
        <DerangedVehicleSection vehicleList={conversions} />
      )}
      {featured1 && <FeaturedSection featured={featured1} />}
      {featured2 && <FeaturedSection featured={featured2} />}
      {featured3 && <FeaturedSection featured={featured3} />}
      {featured4 && <FeaturedSection featured={featured4} />}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          title={tiles.tilesTitle || ''}
          tiles={tiles.tiles || []}
        />
      )}
      <NationalLeagueBanner />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default DerangedPageContainer;
