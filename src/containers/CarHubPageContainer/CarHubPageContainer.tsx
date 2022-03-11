import React, { memo, FC } from 'react';
import SchemaJSON from 'core/atoms/schema-json';
import Heading from 'core/atoms/heading';
import TrustPilot from 'core/molecules/trustpilot';
import Media from 'core/atoms/media';
import ImageV2 from 'core/atoms/image/ImageV2';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';
import Head from '../../components/Head/Head';
import { IPageWithData } from '../../types/common';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sectionsAsArray_featured,
  GenericPageQuery_genericPage_sectionsAsArray_leadText,
} from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import CardsSectionCarousel from '../../components/CardsSectionCarousel';
import { normalizeString } from '../../utils/data';
import HeadingSection from '../../components/HeadingSection';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import RelatedCarousel from '../../components/RelatedCarousel';
import RouterLink from '../../components/RouterLink';

type IProps = IPageWithData<{
  data: GenericPageQuery;
  dataUiTestId?: string;
}>;

const getFeaturesSection = (
  features:
    | (GenericPageQuery_genericPage_sectionsAsArray_featured | null)[]
    | null,
) => {
  return features?.map(featured => (
    <section className={`row:${getFeaturedClassPartial(featured)}`}>
      {featured?.video ? (
        <Media
          src={featured?.video || ''}
          width="100%"
          height="360px"
          dataUiTestId={`car-leasing-page_${normalizeString(
            featured?.title,
          )}_media`}
        />
      ) : (
        <ImageV2
          quality={60}
          objectFit="cover"
          width={featured?.image?.file?.details.image.width ?? 1000}
          height={featured?.image?.file?.details.image.height ?? 650}
          src={
            featured?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
          dataUiTestId={`car-leasing-page_${normalizeString(featured?.title)}`}
        />
      )}
      <div className="-inset -middle -col-400">
        <Heading
          dataUiTestId={`car-leasing-page_${normalizeString(featured?.title)}`}
          size="regular"
          color="black"
          tag={
            getTitleTag(
              featured?.titleTag || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {featured?.title}
        </Heading>
        <div className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={featured?.body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
        </div>
      </div>
    </section>
  ));
};

const getHeadingSection = (
  headingSection: GenericPageQuery_genericPage_sectionsAsArray_leadText | null,
  isLargeText: boolean,
) => (
  <HeadingSection
    titleTag={headingSection?.titleTag}
    header={headingSection?.heading}
    description={headingSection?.description}
    dataUiTestId="car-leasing-page_features1-heading-section"
    largeText={isLargeText}
  />
);

const CarHubPageContainer: FC<IProps> = ({ data, dataUiTestId }) => {
  const { sectionsAsArray } = data?.genericPage;
  const cards = sectionsAsArray?.cards?.[0];
  const tiles = sectionsAsArray?.tiles?.[0]?.tiles;
  const tilesTitle = sectionsAsArray?.tiles?.[0]?.tilesTitle;
  const tilesTitleTag = sectionsAsArray?.tiles?.[0]?.titleTag;

  const features1LeadTextSection = sectionsAsArray?.leadText?.[1];
  const features2LeadTextSection = sectionsAsArray?.leadText?.[2];

  const features1 = sectionsAsArray?.featured?.slice(0, 5);
  const features2 = sectionsAsArray?.featured?.slice(5);

  return (
    <>
      {features1LeadTextSection &&
        getHeadingSection(features1LeadTextSection, true)}

      {features1 && getFeaturesSection(features1)}

      {features2LeadTextSection &&
        getHeadingSection(features2LeadTextSection, true)}

      {features2 && getFeaturesSection(features2)}

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
