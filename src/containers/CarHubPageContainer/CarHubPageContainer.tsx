import React, {
  memo,
  FC,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import SchemaJSON from 'core/atoms/schema-json';
import Heading from 'core/atoms/heading';
import TrustPilot from 'core/molecules/trustpilot';
import ReactMarkdown from 'react-markdown/with-html';
import AccordionItem from 'core/molecules/accordion/AccordionItem';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Accordion from 'core/molecules/accordion';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import Choiceboxes from 'core/atoms/choiceboxes';
import dynamic from 'next/dynamic';
import Head from '../../components/Head/Head';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import CardsSectionCarousel from '../../components/CardsSectionCarousel';
import { normalizeString } from '../../utils/data';
import HeadingSection from '../../components/HeadingSection';
import RouterLink from '../../components/RouterLink';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import RelatedCarousel from '../../components/RelatedCarousel';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { accordionItemsMapper } from './helpers';
import FeaturedSection from '../../components/FeaturedSection';
import { ICarsPageOffersData } from '../../utils/offers';
import { PageTypeEnum } from '../../types/common';
import {
  formatProductPageUrl,
  getLegacyUrl,
  isManufacturerMigrated,
  ManufacturersSlugContext,
} from '../../utils/url';
import truncateString from '../../utils/truncateString';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import useLeaseType from '../../hooks/useLeaseType';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import EligibilityCheckerComponent from './EligibilityCheckerComponent';
import Skeleton from '../../components/Skeleton';
import { filterList as IFilterList } from '../../../generated/filterList';
import CarHubHeroContainer from './CarHubHeroContainer';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps extends ICarsPageOffersData {
  data: GenericPageQuery;
  dataUiTestId?: string;
  serviceBanner?: IServiceBanner;
  pageType: PageTypeEnum.DEFAULT;
  searchPodCarsData: IFilterList;
}

const CarHubPageContainer: FC<IProps> = ({
  data,
  dataUiTestId,
  searchPodCarsData,
  productsCar,
  vehicleListUrlData,
}) => {
  const { vehicles: migratedManufacturers } = useContext(
    ManufacturersSlugContext,
  );
  // pass in true for car leaseType
  const { cachedLeaseType, setCachedLeaseType } = useLeaseType(true);
  const [isPersonal, setIsPersonal] = useState(
    cachedLeaseType === LeaseTypeEnum.PERSONAL,
  );

  const leaseTypes = useMemo(
    () => [
      { label: 'Personal', value: 'Personal', active: isPersonal },
      { label: 'Business', value: 'Business', active: !isPersonal },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { sectionsAsArray } = data?.genericPage;
  const cards = sectionsAsArray?.cards?.[0];
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;

  const accordionFAQs = useMemo(
    () =>
      accordionItemsMapper(
        sectionsAsArray?.faqs?.[0]?.questionSets?.[0]?.questionAnswers || [],
      ),
    [sectionsAsArray?.faqs],
  );
  const accordionTitle = sectionsAsArray?.faqs?.[0]?.questionSets?.[0]?.title;

  const eligibilityBlockText = sectionsAsArray?.leadText?.[0];

  const features1LeadTextSection = sectionsAsArray?.leadText?.[1];
  const features2LeadTextSection = sectionsAsArray?.leadText?.[2];

  const features1 = sectionsAsArray?.featured?.filter(
    featured => !featured?.link,
  );
  const features2 = sectionsAsArray?.featured?.filter(
    featured => featured?.link,
  );

  const manufacturers =
    sectionsAsArray?.accordion?.[0]?.accordionEntries?.[0]?.entryBody;

  useEffect(() => {
    setCachedLeaseType(
      isPersonal ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS,
    );
  }, [isPersonal, setCachedLeaseType]);

  return (
    <>
      <CarHubHeroContainer
        sectionsAsArray={sectionsAsArray}
        searchPodCarsData={searchPodCarsData}
      />
      {eligibilityBlockText && (
        <HeadingSection
          titleTag={eligibilityBlockText.titleTag}
          centeredOnMobile
          header={eligibilityBlockText.heading}
          description={eligibilityBlockText.description}
          dataUiTestId="car-leasing-page_heading-section"
        />
      )}
      <section className="row:eligibility-checker-cta">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <EligibilityCheckerComponent />
        </LazyLoadComponent>
      </section>

      <div className="row:bg-lighter">
        <Heading size="large" color="black" tag="h2" className="-a-center">
          Car Leasing Hot Offers
        </Heading>
        <Text
          className="-justify-content-row -mb-400"
          tag="p"
          size="regular"
          color="darker"
        >
          Find the best deal on your brand new car.
        </Text>
        <section className="row:cards-3col">
          <Choiceboxes
            className="-cols-2"
            choices={leaseTypes}
            onSubmit={value => {
              setIsPersonal(value.label === 'Personal');
            }}
          />
          {productsCar?.productCarousel?.map((item, index) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(
                vehicleListUrlData.edges,
                item?.capId,
                isManufacturerMigrated(
                  migratedManufacturers?.car?.manufacturers,
                  item?.manufacturerName || '',
                ),
              ),
              item?.capId,
            );
            return item ? (
              <VehicleCard
                data={item}
                key={item?.capId || index}
                isPersonalPrice={isPersonal}
                url={productUrl?.url}
                title={{
                  title: truncateString(
                    `${item?.manufacturerName} ${item?.modelName}`,
                  ),
                  description: item?.derivativeName || '',
                }}
                dataUiTestId="car-hub-page_vehicle-card"
              />
            ) : null;
          })}

          <RouterLink
            link={{
              href: '/car-leasing-special-offers.html',
              label: 'View All Cars',
            }}
            classNames={{ color: 'teal', size: 'large' }}
            className="button -solid"
            dataTestId="view-all-cars"
            dataUiTestId="car-leasing-page_view-all-cars_button"
          >
            <div className="button--inner">View All Cars</div>
          </RouterLink>
        </section>
      </div>

      {features1LeadTextSection && (
        <HeadingSection
          titleTag={features1LeadTextSection?.titleTag}
          header={features1LeadTextSection?.heading}
          description={features1LeadTextSection?.description}
          dataUiTestId="car-leasing-page_features1-heading-section"
          largeText
          centeredOnMobile
        />
      )}

      {features1 &&
        features1?.map(featured => (
          <FeaturedSection featured={featured} key={featured?.title} />
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
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_${normalizeString(cards?.name)}_title`
                : undefined
            }
          >
            {cards?.name}
          </Heading>
          <CardsSectionCarousel
            cards={cards?.cards || []}
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_cards-section-carousel`
                : undefined
            }
          />
        </div>
      )}

      {features2LeadTextSection && (
        <HeadingSection
          titleTag={features2LeadTextSection?.titleTag}
          header={features2LeadTextSection?.heading}
          centeredOnMobile
          description={features2LeadTextSection?.description}
          dataUiTestId="car-leasing-page_features1-heading-section"
          largeText
        />
      )}

      {features2 &&
        features2?.map(featured => (
          <FeaturedSection featured={featured} key={featured?.title} />
        ))}

      <LazyLoadComponent
        visibleByDefault={isServerRenderOrAppleDevice}
        placeholder={<span className="-d-block -h-300" />}
      >
        <div className="row:bg-white">
          <div className="tile--accordion">
            <Heading size="large" color="black">
              {accordionTitle}
            </Heading>
            <Accordion items={accordionFAQs || []} />
          </div>
        </div>
      </LazyLoadComponent>

      {sectionsAsArray?.cards?.[1]?.cards?.length && (
        <RelatedCarousel
          cards={sectionsAsArray?.cards?.[1]?.cards || []}
          title={sectionsAsArray?.cards?.[1]?.name || ''}
          description={sectionsAsArray?.cards?.[1]?.description}
          className="blog-carousel"
          renderNewPagination
        >
          <RouterLink
            link={{
              href: '/guides/cars',
              label: 'Learn About Electric Cars',
            }}
            className="button"
            withoutDefaultClassName
            classNames={{
              color: 'primary',
              solid: true,
              size: 'regular',
            }}
          >
            <div className="button--inner">Learn About Electric Cars</div>
          </RouterLink>
        </RelatedCarousel>
      )}

      {manufacturers && (
        <section className="row: full-width accordion">
          <AccordionItem
            item={{
              id: 1,
              title: 'Manufacturers',
              children: (
                <ReactMarkdown allowDangerousHtml source={manufacturers} />
              ),
            }}
            className="bordered"
          />
        </section>
      )}

      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
        />
      )}
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

export default memo(CarHubPageContainer);
