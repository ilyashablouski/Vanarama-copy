import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import {
  vehicleList as IVehicleList,
  vehicleList_vehicleList_edges as IVehicle,
} from '../../../generated/vehicleList';
import {
  GetProductCard as IProductCardList,
  GetProductCard_productCard as IProductCard,
} from '../../../generated/GetProductCard';
import {
  GenericPageQuery_genericPage as IGenericPage,
  GenericPageQuery_genericPage_sectionsAsArray_featured as IFeatured,
} from '../../../generated/GenericPageQuery';
import { Nullable } from '../../types/common';

import Skeleton from '../../components/Skeleton';
import LevcHeroBanner from './components/LevcHeroBanner';

const FeaturedSection = dynamic(
  () => import('../../components/FeaturedSection'),
  { loading: () => <Skeleton count={1} /> },
);
const LeadText = dynamic(
  () => import('../LandingPageContainer/LeadTextComponent'),
  { loading: () => <Skeleton count={1} /> },
);
const LevcVehicleList = dynamic(() => import('./components/LevcVehicleList'), {
  loading: () => <Skeleton count={1} />,
});
const WhyLeaseWithVanaramaTiles = dynamic(
  () => import('../../components/WhyLeaseWithVanaramaTiles'),
  { loading: () => <Skeleton count={1} /> },
);
const RelatedCarousel = dynamic(
  () => import('../../components/RelatedCarousel'),
  { loading: () => <Skeleton count={1} /> },
);

const defaultTextColor = '#000000';
const defaultAccentColor = '#FFEC00';

interface ILevcPageContainer {
  vehiclesData: Nullable<IVehicleList>;
  productCardsData: Nullable<IProductCardList>;
  genericPage: IGenericPage;
}

const LevcPageContainer: React.FC<ILevcPageContainer> = ({
  genericPage,
  vehiclesData,
  productCardsData,
}) => {
  const accentColor = genericPage.colourPrimary ?? defaultAccentColor;
  const { hero, leadText, tiles, carousel, featured: featuredSections } =
    genericPage.sectionsAsArray ?? {};

  const heroSection = hero?.[0];
  const tilesSection = tiles?.[0];
  const carouselSection = carousel?.[0];
  const leadTextSection = leadText?.[0];
  const aboutSection = featuredSections?.[0];

  const vehicleList = useMemo(
    () =>
      vehiclesData?.vehicleList.edges &&
      (vehiclesData.vehicleList.edges.filter(Boolean) as IVehicle[]),
    [vehiclesData],
  );
  const productCardList = useMemo(
    () =>
      productCardsData?.productCard &&
      (productCardsData.productCard.filter(Boolean) as IProductCard[]),
    [productCardsData],
  );
  const featuredSectionList = useMemo(
    () =>
      featuredSections &&
      (featuredSections.slice(1).filter(Boolean) as IFeatured[]),
    [featuredSections],
  );

  return (
    <>
      <LevcHeroBanner
        backgroundUrl={heroSection?.image?.file?.url ?? ''}
        backgroundUrlMobile={heroSection?.mobileImage?.file?.url ?? ''}
        logoUrl={heroSection?.logo?.file?.url ?? ''}
        accentColor={accentColor}
      />
      {aboutSection && <FeaturedSection featured={aboutSection} />}
      {productCardList?.length && vehicleList?.length ? (
        <LevcVehicleList
          accentColor={accentColor}
          accentTextColor={defaultTextColor}
          productCardList={productCardList}
          vehicleList={vehicleList}
        />
      ) : null}
      {leadTextSection && (
        <LeadText
          className="-a-center"
          leadText={leadTextSection}
          withSeparator={false}
        />
      )}
      {featuredSectionList?.map(featuredSection => (
        <React.Fragment key={featuredSection.title}>
          <FeaturedSection
            featured={featuredSection}
            videoClassName="aspect-16-9"
            videoHeight="100%"
          />
        </React.Fragment>
      ))}
      {tilesSection?.tiles && (
        <WhyLeaseWithVanaramaTiles
          title={tilesSection.tilesTitle}
          tiles={tilesSection.tiles}
        />
      )}
      {carouselSection && (
        <RelatedCarousel
          cards={carouselSection.cards}
          title={carouselSection.title}
        />
      )}
    </>
  );
};

export default LevcPageContainer;
