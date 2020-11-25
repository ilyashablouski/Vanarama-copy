/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import ReactMarkdown from 'react-markdown';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import moment from 'moment';
import { useRouter } from 'next/router';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink/RouterLink';
import { ICategoryPage } from './interface';
import { GenericPageQuery_genericPage_sections_tiles_tiles } from '../../../generated/GenericPageQuery';
import { BlogPosts_blogPosts_articles } from '../../../generated/BlogPosts';
import Head from '../../components/Head/Head';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { getBody } from '../../utils/articles';
import { setSource } from '../../utils/url';

const renderCarouselCards = (cards: any[] | undefined) =>
  cards?.map((card, index) => {
    const hrefLink = setSource(
      card.legacyUrl ||
        card.link?.legacyUrl ||
        card.link?.url ||
        card.link ||
        '',
    );
    return (
      card && (
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          key={`${card.title}_${index.toString()}_${card.body}`}
          className="card__article"
          imageSrc={
            card.featuredImage?.file?.url || card.image?.file?.url || ''
          }
          title={{
            className: '-flex-h',
            link: (
              <RouterLink
                withoutDefaultClassName
                className="heading"
                classNames={{ color: 'black', size: 'lead' }}
                link={{
                  href: hrefLink,
                  label: card?.title || '',
                }}
              >
                {card?.name}
              </RouterLink>
            ),
            title: '',
          }}
        >
          <ReactMarkdown
            allowDangerousHtml
            source={getBody(card?.body || '')}
            renderers={{
              link: props => {
                const { href, children } = props;
                return (
                  <RouterLink
                    link={{ href, label: children }}
                    classNames={{ color: 'teal' }}
                  />
                );
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
          <RouterLink
            classNames={{ color: 'teal', size: 'regular' }}
            link={{
              label: 'Read More',
              href: hrefLink,
            }}
          />
        </Card>
      )
    );
  });

const renderCards = (
  cards: GenericPageQuery_genericPage_sections_tiles_tiles[] | null | undefined,
) => {
  return cards?.map((card, index) =>
    card?.body ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={`${card.title}_${index.toString()}_${card.body}`}
        imageSrc={card.image?.file?.url || ''}
        title={{
          className: '-flex-h',
          link: (
            <RouterLink
              withoutDefaultClassName
              className="heading"
              classNames={{ color: 'black', size: 'lead' }}
              link={{
                href: setSource(card.link?.legacyUrl || card.link?.url || ''),
                label: card?.title || '',
              }}
            >
              {card?.title}
            </RouterLink>
          ),
          title: card.title || '',
          withBtn: true,
        }}
        description={card.body}
      />
    ) : null,
  );
};

const CategoryPageContainer: React.FC<ICategoryPage> = ({
  metaData,
  featured,
  pageTitle,
  articles,
  tiles,
  breadcrumbsItems,
  carousel,
  activePageRoute,
}) => {
  const [activePage, setActivePage] = useState(activePageRoute || 1);
  const { pathname, query, push } = useRouter();

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

  const articlesSorted = articles
    ? [...articles]?.sort((firstArticle, secondArticle) =>
        moment(secondArticle?.publishedOn).diff(
          moment(firstArticle?.publishedOn),
        ),
      )
    : [];

  const data = articlesSorted?.reduce(
    (obj, el) => {
      if (el?.isFeatured) {
        obj.topArticles.push(el);
        return obj;
      }
      obj.articles.push(el);
      return obj;
    },
    {
      topArticles: [] as (BlogPosts_blogPosts_articles | null)[],
      articles: [] as (BlogPosts_blogPosts_articles | null)[],
    },
  );

  const countPages = () => Math.ceil((data?.articles?.length || 0) / 9);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const renderArticles = () => {
    const indexOfLastOffer = activePage * 9;
    const indexOfFirstOffer = indexOfLastOffer - 9;
    // we get the right amount of cards for the current page
    const showCards = data?.articles?.slice(
      indexOfFirstOffer,
      indexOfLastOffer,
    );
    return showCards?.map(card =>
      card?.body ? (
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          key={card?.body || undefined}
          imageSrc={card.featuredImage?.file?.url || ''}
          title={{
            className: '-flex-h',
            link: (
              <RouterLink
                withoutDefaultClassName
                className="heading"
                classNames={{ color: 'black', size: 'lead' }}
                link={{
                  href: setSource(card.legacyUrl || ''),
                  label: card?.name || '',
                }}
              >
                {card?.name}
              </RouterLink>
            ),
            title: '',
          }}
        >
          <div>
            <ReactMarkdown
              source={getBody(card?.body)}
              allowDangerousHtml
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return (
                    <RouterLink
                      classNames={{ color: 'teal' }}
                      link={{ href, label: children }}
                    />
                  );
                },
                heading: props => (
                  <Text {...props} size="lead" color="dark" tag="h3" />
                ),
                paragraph: props => <Text {...props} tag="p" color="dark" />,
              }}
            />
          </div>
          <RouterLink
            classNames={{ color: 'teal', size: 'regular' }}
            link={{
              label: 'Read More',
              href: setSource(card.legacyUrl || ''),
            }}
          />
        </Card>
      ) : null,
    );
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {metaData?.name || pageTitle}
        </Heading>
      </div>
      {featured && (
        <div className="row:featured-left">
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={featured?.image?.file?.url || ''}
          />
          <div>
            <Heading size="large" color="black">
              {featured?.title}
            </Heading>
            <ReactMarkdown
              allowDangerousHtml
              source={featured?.body || ''}
              renderers={{
                link: props => {
                  const { href, children } = props;
                  return (
                    <RouterLink
                      classNames={{ color: 'teal', size: 'regular' }}
                      link={{ href, label: children }}
                    />
                  );
                },
                heading: props => (
                  <Text {...props} size="lead" color="darker" tag="h3" />
                ),
                paragraph: props => (
                  <Text {...props} tag="p" size="regular" color="darker" />
                ),
              }}
            />
          </div>
        </div>
      )}
      {!!data?.topArticles?.length && (
        <div className="row:bg-lighter -col-300">
          <Heading className="-a-center" tag="h3" size="large" color="black">
            Top Articles
          </Heading>
          {data?.topArticles.length > 3 ? (
            <Carousel className="-mh-auto" countItems={5}>
              {renderCarouselCards(data?.topArticles)}
            </Carousel>
          ) : (
            <div className="row:cards-3col">
              {renderCarouselCards(data?.topArticles)}
            </div>
          )}
        </div>
      )}
      {!!carousel?.cards?.length && (
        <div className="row:bg-lighter -col-300">
          <Heading className="-a-center" tag="h3" size="large" color="black">
            {carousel.title}
          </Heading>
          {carousel.cards.length > 3 ? (
            <Carousel className="-mh-auto" countItems={5}>
              {renderCarouselCards(carousel.cards)}
            </Carousel>
          ) : (
            <div className="row:cards-3col">
              {renderCarouselCards(carousel.cards)}
            </div>
          )}
        </div>
      )}
      {tiles && tiles?.tiles?.length && (
        <div className="row:bg-lighter -col-300">
          <div className="row:cards-3col">
            <Heading
              className="-a-center"
              tag={
                (getTitleTag(tiles?.titleTag) ||
                  'h3') as keyof JSX.IntrinsicElements
              }
              size="large"
              color="black"
            >
              {tiles?.tilesTitle}
            </Heading>
            {renderCards(tiles?.tiles)}
          </div>
        </div>
      )}
      {data?.articles && (
        <div className="row:bg-lighter -col-300">
          <div className="row:cards-3col">{renderArticles()}</div>
          {data?.articles.length > 9 && (
            <div className="row:pagination">
              <Pagination
                path={pathname.replace('/[pageNumber]', '')}
                pathForFirstPage={pathname.replace('/page/[pageNumber]', '')}
                pathWithHtml
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
          )}
        </div>
      )}
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default CategoryPageContainer;
