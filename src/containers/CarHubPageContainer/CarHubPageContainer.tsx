import React, { memo, FC } from 'react';
import SchemaJSON from 'core/atoms/schema-json';
import Heading from 'core/atoms/heading';
import TrustPilot from 'core/molecules/trustpilot';
import Head from '../../components/Head/Head';
import { IPageWithData } from '../../types/common';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import CardsSectionCarousel from '../../components/CardsSectionCarousel';
import { normalizeString } from '../../utils/data';
import HeadingSection from '../../components/HeadingSection';
import RouterLink from '../../components/RouterLink';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import RelatedCarousel from '../../components/RelatedCarousel';
import FeaturedSection from '../../components/FeaturedSection';

type IProps = IPageWithData<{
  data: GenericPageQuery;
  dataUiTestId?: string;
}>;

const CarHubPageContainer: FC<IProps> = ({ data, dataUiTestId }) => {
  const { sectionsAsArray } = data?.genericPage;
  const cards = sectionsAsArray?.cards?.[0];
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;

  const features1LeadTextSection = sectionsAsArray?.leadText?.[1];
  const features2LeadTextSection = sectionsAsArray?.leadText?.[2];

  const features1 = sectionsAsArray?.featured?.filter(
    featured => !featured?.link,
  );
  const features2 = sectionsAsArray?.featured?.filter(
    featured => featured?.link,
  );

  return (
    <>
      {features1LeadTextSection && (
        <HeadingSection
          titleTag={features1LeadTextSection?.titleTag}
          header={features1LeadTextSection?.heading}
          description={features1LeadTextSection?.description}
          dataUiTestId="car-leasing-page_features1-heading-section"
          largeText
        />
      )}

      {features1 &&
        features1?.map(featured => <FeaturedSection featured={featured} />)}

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

      {features1LeadTextSection && (
        <HeadingSection
          titleTag={features2LeadTextSection?.titleTag}
          header={features2LeadTextSection?.heading}
          description={features2LeadTextSection?.description}
          dataUiTestId="car-leasing-page_features1-heading-section"
        />
      )}

      {features2 &&
        features2?.map(featured => <FeaturedSection featured={featured} />)}

      {sectionsAsArray?.cards?.[1]?.cards?.length && (
        <RelatedCarousel
          cards={sectionsAsArray?.cards?.[1]?.cards || []}
          title={sectionsAsArray?.cards?.[1]?.name || ''}
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
