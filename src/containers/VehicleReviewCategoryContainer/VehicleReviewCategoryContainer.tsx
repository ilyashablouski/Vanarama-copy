import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import ReactMarkdown from 'react-markdown';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/ReviewsHubCategoryQuery';
import { getMarkdownRenderers } from './Utils';
import { getSectionsData } from '../../utils/getSectionsData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Pagination = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/pagination'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

interface IProps {
  data: ReviewsHubCategoryQuery | undefined;
  pageNumber?: number;
  breadcrumbsItems?: any;
}

const VehicleReviewCategoryContainer: FC<IProps> = ({
  data,
  pageNumber,
  breadcrumbsItems,
}) => {
  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );

  const [activePage] = useState(pageNumber || 1);
  const countPages = () => Math.ceil((cards?.length || 0) / 12);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const renderCards = () => {
    const indexOfLastOffer = activePage * 12;
    const indexOfFirstOffer = indexOfLastOffer - 12;
    // we get the right amount of cards for the current page
    const showCards = (cards as Cards[]).slice(
      indexOfFirstOffer,
      indexOfLastOffer,
    );
    return showCards?.map((reviewCard, idx) => (
      <Card
        loadImage
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={idx.toString()}
        title={{
          title: reviewCard.title || '',
          score: Number(reviewCard.reviewRating) || 0,
          link: (
            <RouterLink
              link={{
                href: reviewCard.link?.legacyUrl || reviewCard.link?.url || '#',
                label: reviewCard.title || '',
              }}
              className="heading"
              classNames={{ size: 'lead', color: 'black' }}
            />
          ),
        }}
        description={reviewCard.body || ''}
        imageSrc={reviewCard.image?.file?.url || ''}
      >
        <RouterLink
          link={{
            href: reviewCard.link?.legacyUrl || reviewCard.link?.url || '#',
            label: 'Read Review >',
          }}
          className="button"
          classNames={{ color: 'teal', size: 'small', clear: true }}
          withoutDefaultClassName
        >
          <div className="button--inner">Read Review &gt;</div>
        </RouterLink>
      </Card>
    ));
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
      </div>
      <div className="row:text -columns">
        <div>
          <ReactMarkdown
            source={body || ''}
            renderers={getMarkdownRenderers()}
          />
        </div>
      </div>
      {cards?.length && (
        <>
          <div className="row:cards-3col -pt-300">{renderCards()}</div>
          <div className="row:pagination">
            <Pagination
              path={`/${metaData?.legacyUrl?.replace('.html', '') || ''}/page`}
              pathForFirstPage={`/${metaData?.legacyUrl?.replace('.html', '') ||
                ''}`}
              pathWithHtml
              pages={pages}
              selected={activePage}
            />
          </div>
        </>
      )}
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

export default VehicleReviewCategoryContainer;
