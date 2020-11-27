import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import ReactMarkdown from 'react-markdown';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/ReviewsHubCategoryQuery';
import { getMarkdownRenderers } from './Utils';
import { getSectionsData } from '../../utils/getSectionsData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';

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
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );

  const [activePage, setActivePage] = useState(pageNumber || 1);
  const { pathname, query, push } = useRouter();
  const path =
    pathname.indexOf('/page') > -1
      ? pathname.replace('/[pageNumber]', '')
      : `${pathname}/page`;

  const countPages = () => Math.ceil((cards?.length || 0) / 12);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);
  useEffect(() => {
    // change url for first pagination page
    if (activePage === 1 && query.pageNumber) {
      push(
        {
          pathname: pathname.replace('/page/[pageNumber]', ''),
        },
        undefined,
        { shallow: true },
      );
      // cases when we have page route, for example change page from 2 to 3
    } else if (
      query.pageNumber &&
      parseInt(query?.pageNumber as string, 10) !== activePage
    ) {
      push(
        {
          pathname,
        },
        pathname.replace('[pageNumber]', `${activePage}`),
        { shallow: true },
      );
      // when changing from first page to others
    } else if (activePage !== 1 && !query.pageNumber) {
      push(
        {
          pathname: `${pathname}/page/[pageNumber]`,
        },
        `${pathname}/page/${activePage}`,
        { shallow: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

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
              path={path}
              pathWithHtml
              pathForFirstPage={pathname.replace('/page/[pageNumber]', '')}
              pages={pages}
              onClick={el => {
                el.preventDefault();
                setActivePage(+(el.target as Element).innerHTML);
              }}
              onClickBackArray={el => {
                el.preventDefault();
                setActivePage(activePage - 1);
              }}
              onClickNextArray={el => {
                el.preventDefault();
                setActivePage(activePage + 1);
              }}
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
