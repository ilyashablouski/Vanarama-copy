import React, { useState, memo, FC, useMemo } from 'react';
import TrustPilot from 'core/molecules/trustpilot';
import SchemaJSON from 'core/atoms/schema-json';
import dynamic from 'next/dynamic';
import FreeHomeCharger from 'core/assets/icons/FreeHomeCharger';
import CardLabel from 'core/molecules/cards/CardLabel';

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
import Hero from '../../components/Hero';
import { filterList as IFilterList } from '../../../generated/filterList';
import Skeleton from '../../components/Skeleton';
import { getSectionsData } from '../../utils/getSectionsData';
import BenefitsComponent from './BenefitsComponent';
import LeadTextComponent from '../LandingPageContainer/LeadTextComponent';

const RouterLink = dynamic(() =>
  import('../../components/RouterLink/RouterLink'),
);
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const Price = dynamic(() => import('core/atoms/price'));

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

  const heroBody = sectionsAsArray?.hero?.[0]?.body;
  const heroBodyArr = heroBody?.split(' ');
  const priceLabel = heroBody?.slice(0, heroBody.indexOf('£'));
  const price = heroBodyArr?.find(phrase => phrase.includes('£'));
  const priceDescription = heroBody?.replace(`${priceLabel}${price}`, '');

  return (
    <>
      <Hero
        searchPodCarsData={searchPodCarsData}
        isCustomSearchButtonLabel
        className="electric-hero"
      >
        <div className="electric-hero--card">
          <h2 className="electric-hero--title">
            {sectionsAsArray?.hero?.[0]?.title}
          </h2>
          <CardLabel
            className="electric-hero--extras"
            text="Free Home charger"
            icon={<FreeHomeCharger />}
          />
          <Image
            lazyLoad
            className="electric-hero--image"
            plain
            size="expand"
            src={
              sectionsAsArray?.hero?.[0]?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
          <section className="electric-hero--description ">
            <Price
              price={Number(price?.slice(1))}
              size="large"
              separator="."
              priceDescription={priceDescription}
              priceLabel={priceLabel}
            />
            <RouterLink
              link={{
                href: sectionsAsArray?.hero?.[0]?.heroCta?.[0]?.url || '',
                label: 'View Deal',
              }}
              classNames={{ color: 'teal', solid: true, size: 'regular' }}
              className="button"
            >
              <div className="button--inner">View Deal</div>
            </RouterLink>
          </section>
        </div>
      </Hero>
      <LeadTextComponent
        leadText={leadTexts[0]}
        withSeparator={false}
        className="-a-center"
      />
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
