import React, { useState, memo, FC, useMemo } from 'react';
import TrustPilot from 'core/molecules/trustpilot';
import SchemaJSON from 'core/atoms/schema-json';
import dynamic from 'next/dynamic';
import Heading from 'core/atoms/heading';
import Accordion from 'core/molecules/accordion';
import { IAccordionItem } from 'core/molecules/accordion/AccordionItem';
import HeadingSection from '../../components/HeadingSection';
import FeaturedSection from '../../components/FeaturedSection';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import NationalLeagueBanner from '../../components/NationalLeagueBanner';
import FeaturedOnBanner from '../../components/FeaturedOnBanner';
import Head from '../../components/Head/Head';
import CardsSection from './CardSection';
import { IPageWithData } from '../../types/common';
import { IEvOffersData } from '../../utils/offers';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { filterList as IFilterList } from '../../../generated/filterList';
import { getSectionsData } from '../../utils/getSectionsData';
import BenefitsComponent from './BenefitsComponent';
import LeadTextComponent from '../LandingPageContainer/LeadTextComponent';
import getTitleTag from '../../utils/getTitleTag';
import CardsSectionCarousel from '../../components/CardsSectionCarousel';
import EvHeroSection from './EvHeroSection';
import RelatedCarousel from '../../components/RelatedCarousel';

const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
    searchPodCarsData: IFilterList;
  }
>;

const ECarsPage: FC<IProps> = ({
  data,
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
  searchPodCarsData,
}) => {
  const { sectionsAsArray } = data?.genericPage;
  const featuresArrayWithLink = (sectionsAsArray?.featured || []).filter(
    featured => featured?.link,
  );
  const featuresArrayWithoutLink = (sectionsAsArray?.featured || []).filter(
    featured => !featured?.link,
  );
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;
  const leadTexts = sectionsAsArray?.leadText || [];
  const cards = sectionsAsArray?.cards?.[0];
  const accordionTitle = useMemo(
    () =>
      getSectionsData(
        ['sectionsAsArray', 'accordion', '0', 'title'],
        data.genericPage,
      ),
    [data.genericPage],
  );

  const accordionItems = useMemo(
    () =>
      getSectionsData(
        ['sectionsAsArray', 'accordion', '0', 'accordionEntries'],
        data.genericPage,
      )?.map((item: any, index: number) => {
        return {
          id: index,
          title: item.name,
          children: item.entryBody,
        } as IAccordionItem;
      }) || [],
    [data.genericPage],
  );

  const [isPersonal, setIsPersonal] = useState<boolean>(true);

  return (
    <>
      <EvHeroSection
        sectionsAsArray={sectionsAsArray}
        searchPodCarsData={searchPodCarsData}
      />
      <LeadTextComponent
        leadText={leadTexts[0]}
        xlargeText
        withSeparator={false}
        className="-a-center"
      />
      <HeadingSection
        titleTag="h2"
        header={sectionsAsArray?.carousel?.[0]?.title}
        description={sectionsAsArray?.carousel?.[0]?.subtitle}
        largeText
      />
      <CardsSection
        derivatives={productsElectricOnlyCarDerivatives?.derivatives || null}
        productCard={productsElectricOnlyCar?.productCarousel || null}
        vehicleList={vehicleListUrlData}
        setIsPersonal={setIsPersonal}
        isPersonal={isPersonal}
      >
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            classNames={{
              color: 'teal',
              solid: true,
              size: 'regular',
            }}
            link={{
              label: 'Browse Electric Car Deals',
              href: '/car-leasing/electric',
            }}
            withoutDefaultClassName
            dataTestId="view-all-electric-cars"
            dataUiTestId="electric-leasing-cars-view_electric_car-button"
          >
            <div className="button--inner">Browse Electric Car Deals</div>
          </RouterLink>
        </div>
      </CardsSection>
      <HeadingSection
        titleTag="h2"
        header={sectionsAsArray?.carousel?.[1]?.title}
        description={sectionsAsArray?.carousel?.[1]?.subtitle}
        largeText
      />
      <CardsSection
        derivatives={productsHybridOnlyCarDerivatives?.derivatives || null}
        productCard={productsHybridOnlyCar?.productCarousel || null}
        vehicleList={vehicleListUrlData}
        setIsPersonal={setIsPersonal}
        isPersonal={isPersonal}
        position={1}
      >
        <div className="-justify-content-row -pt-500">
          <RouterLink
            className="button"
            classNames={{
              color: 'teal',
              solid: true,
              size: 'regular',
            }}
            link={{
              label: 'Browse Hybrid Car Deals',
              href: '/car-leasing/hybrid',
            }}
            withoutDefaultClassName
            dataTestId="view-all-hybrid-cars"
            dataUiTestId="electric-leasing-cars-view_hybrid_car-button"
          >
            <div className="button--inner">Browse Hybrid Car Deals</div>
          </RouterLink>
        </div>
      </CardsSection>
      <BenefitsComponent />
      <LeadTextComponent
        leadText={leadTexts[1]}
        withSeparator={false}
        className="-a-center"
      />
      {featuresArrayWithoutLink.map(section => (
        <React.Fragment key={section?.targetId || section?.title}>
          <FeaturedSection featured={section} />
        </React.Fragment>
      ))}
      {cards?.cards?.length && (
        <div className="row:bg-lighter">
          <Heading
            color="black"
            size="large"
            className="-a-center -mb-300"
            tag={
              getTitleTag(
                cards?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
          >
            {cards?.name}
          </Heading>
          <CardsSectionCarousel cards={cards?.cards || []} />
        </div>
      )}
      <LeadTextComponent
        leadText={leadTexts[2]}
        withSeparator={false}
        className="-a-center"
      />
      {featuresArrayWithLink.map(section => (
        <React.Fragment key={section?.targetId || section?.title}>
          <FeaturedSection featured={section} />
        </React.Fragment>
      ))}
      {accordionItems?.length && (
        <div className="row:bg-white">
          <div className="tile--accordion">
            <Heading size="large" color="black">
              {accordionTitle}
            </Heading>
            <Accordion items={accordionItems} />
          </div>
        </div>
      )}
      {sectionsAsArray?.carousel?.[2]?.cards?.length && (
        <RelatedCarousel
          cards={sectionsAsArray?.carousel?.[2]?.cards || []}
          title={sectionsAsArray?.carousel?.[2]?.title || ''}
          className="blog-carousel"
          renderNewPagination
        />
      )}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
        />
      )}
      <NationalLeagueBanner />
      <FeaturedOnBanner />
      <section className="row:trustpilot">
        <TrustPilot />
      </section>
      {data?.genericPage.metaData && (
        <>
          <Head
            metaData={data?.genericPage.metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.genericPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export default memo(ECarsPage);
