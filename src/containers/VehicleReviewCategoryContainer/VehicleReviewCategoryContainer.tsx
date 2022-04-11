import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from 'core/atoms/schema-json';
import ReactMarkdown from 'react-markdown';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/ReviewsHubCategoryQuery';
import { Nullable } from '../../types/common';
import { getMarkdownRenderers } from './helpers';
import { getSectionsData } from '../../utils/getSectionsData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Pagination = dynamic(() => import('core/atoms/pagination'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  data: ReviewsHubCategoryQuery | undefined;
  pageNumber?: Nullable<number>;
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
    return showCards?.map((reviewCard, index) => (
      <Card
        loadImage
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={index.toString()}
        title={{
          title: reviewCard.title || '',
          score: Number(reviewCard.reviewRating) || undefined,
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
            label: reviewCard.link?.text
              ? `${reviewCard.link?.text} >`
              : 'Read Review >',
          }}
          className="button"
          classNames={{ color: 'teal', size: 'small', clear: true }}
          withoutDefaultClassName
        >
          <div className="button--inner">
            {reviewCard.link?.text
              ? `${reviewCard.link?.text} >`
              : 'Read Review >'}
          </div>
        </RouterLink>
      </Card>
    ));
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
      </div>
      {body && (
        <div className="row:text -columns">
          <div className="ev-hub-markdown">
            <ReactMarkdown source={body} renderers={getMarkdownRenderers()} />
          </div>
        </div>
      )}
      {cards?.length && (
        <>
          <div className="row:cards-3col -pt-300">{renderCards()}</div>
          <div className="row:pagination">
            <Pagination
              path={`/${metaData?.legacyUrl?.replace('.html', '') ||
                metaData?.slug}/page`}
              pathForFirstPage={`/${metaData?.legacyUrl?.replace('.html', '') ||
                metaData?.slug}`}
              pathWithHtml={!!metaData?.legacyUrl}
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
            paginatedPageNumber={activePage}
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
