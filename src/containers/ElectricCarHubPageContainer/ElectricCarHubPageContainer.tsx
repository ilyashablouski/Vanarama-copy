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
import HeroSection from './HeroSection';
import { getSectionsData } from '../../utils/getSectionsData';

const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
  }
>;

const ECarsPage: FC<IProps> = ({
  data,
  productsElectricOnlyCar,
  productsElectricOnlyCarDerivatives,
  productsHybridOnlyCar,
  productsHybridOnlyCarDerivatives,
  vehicleListUrlData,
}) => {
  const { sectionsAsArray } = data?.genericPage;
  const featuresArray = sectionsAsArray?.featured || [];
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;
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
      <HeroSection sectionsAsArray={sectionsAsArray} />
      <HeadingSection
        titleTag="h1"
        header={sectionsAsArray?.carousel?.[0]?.title}
        description={sectionsAsArray?.carousel?.[0]?.subtitle}
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
        titleTag="h1"
        header={sectionsAsArray?.carousel?.[1]?.title}
        description={sectionsAsArray?.carousel?.[1]?.subtitle}
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
      {featuresArray.map(section => (
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
