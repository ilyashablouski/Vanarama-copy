import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from 'core/atoms/schema-json';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery_genericPage as IGenericPage } from '../../../generated/GenericPageQuery';
import { GetConversionsVehicleList_conversions as ConversionsVehicleList } from '../../../generated/GetConversionsVehicleList';
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
  genericPage: IGenericPage;
  conversions: (ConversionsVehicleList | null)[] | null;
}

const DerangedPageContainer: React.FC<IDerangedPageContainer> = ({
  genericPage,
  conversions,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [vehicleList, setVehicleList] = useState<
    (ConversionsVehicleList | null)[] | null
  >(conversions);
  const { metaData } = genericPage;
  const { hero, featured1, featured2, featured3, featured4, tiles } =
    genericPage.sections || {};

  return (
    <>
      {hero && (
        <DerangedHeroSection
          title={hero.title || ''}
          body={hero.body || ''}
          image={hero.image}
        />
      )}
      {vehicleList?.length && (
        <DerangedVehicleSection vehicleList={vehicleList} />
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
