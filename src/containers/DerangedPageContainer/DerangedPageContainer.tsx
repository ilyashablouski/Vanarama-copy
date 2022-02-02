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

const DerangedLeadSection = dynamic(
  () => import('./sections/DerangedLeadSection'),
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
  const { hero, leadText, featured1, featured2, featured3, featured4, tiles } =
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
      {leadText && (
        <DerangedLeadSection
          description={leadText.description}
          heading={leadText.heading}
        />
      )}
      {vehicleList?.length && (
        <DerangedVehicleSection
          vehicleList={vehicleList}
          dataUiTestId="deranged-vehicles_vehicle-section"
        />
      )}
      {featured1 && (
        <FeaturedSection
          featured={featured1}
          dataUiTestId="deranged-vehicles_content-1"
        />
      )}
      {featured2 && (
        <FeaturedSection
          featured={featured2}
          dataUiTestId="deranged-vehicles_content-2"
        />
      )}
      {featured3 && (
        <FeaturedSection
          featured={featured3}
          dataUiTestId="deranged-vehicles_content-3"
        />
      )}
      {featured4 && (
        <FeaturedSection
          featured={featured4}
          dataUiTestId="deranged-vehicles_content-4"
        />
      )}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          title={tiles.tilesTitle || ''}
          tiles={tiles.tiles || []}
          dataUiTestId="deranged-vehicles_why-lease-with-vanarama"
        />
      )}
      <NationalLeagueBanner dataUiTestId="deranged-vehicles_national-league-banner" />
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
