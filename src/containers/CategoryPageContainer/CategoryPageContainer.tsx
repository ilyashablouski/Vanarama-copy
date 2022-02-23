import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SchemaJSON from 'core/atoms/schema-json';
import ReactMarkdown from 'react-markdown';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { SwiperSlide } from 'swiper/react';
import ServiceBanner from 'core/molecules/service-banner';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink/RouterLink';
import { ICategoryPage } from './interface';
import { GenericPageQuery_genericPage_sections_tiles_tiles } from '../../../generated/GenericPageQuery';
import { BlogPosts_blogPosts_articles } from '../../../generated/BlogPosts';
import Head from '../../components/Head/Head';
import { setSource } from '../../utils/url';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});
const Pagination = dynamic(() => import('core/atoms/pagination'), {
  loading: () => <Skeleton count={1} />,
});
const CarouselSwiper = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={3} />,
});

const CategoryPageContainer: React.FC<ICategoryPage> = ({
  metaData,
  featured,
  pageTitle,
  articles,
  tiles,
  breadcrumbsItems,
  carousel,
  activePageRoute,
  serviceBanner,
}) => {
  const [activePage] = useState(activePageRoute || 1);

  const articlesSorted = articles
    ? [...articles]?.sort(
        (firstArticle, secondArticle) =>
          new Date(secondArticle?.metaData?.publishedOn ?? '').getTime() -
          new Date(firstArticle?.metaData?.publishedOn ?? '').getTime(),
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
      card ? (
        <Card
          loadImage
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          key={card?.excerpt || undefined}
          imageSrc={card.featuredImage?.file?.url || ''}
          title={{
            className: '-flex-h',
            link: (
              <RouterLink
                withoutDefaultClassName
                className="heading"
                classNames={{ color: 'black', size: 'lead' }}
                link={{
                  href: setSource((card.legacyUrl || card.slug) ?? ''),
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
              source={card.excerpt || ''}
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
              href: setSource((card.legacyUrl || card.slug) ?? ''),
            }}
          />
        </Card>
      ) : null,
    );
  };

  const renderCarouselCards = (cards: any[] | undefined) =>
    cards?.map((card, index) => {
      const hrefLink = setSource(
        (card.legacyUrl ||
          card.link?.legacyUrl ||
          card.link?.url ||
          card.link ||
          card.slug) ??
          '',
      );
      return (
        card && (
          <SwiperSlide key={index.toString()}>
            <Card
              style={{ minHeight: 420 }}
              loadImage
              lazyLoad={index !== 0}
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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
                source={card.excerpt || ''}
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
                  paragraph: props => (
                    <Text {...props} tag="p" color="darker" />
                  ),
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
          </SwiperSlide>
        )
      );
    });

  const renderCards = (
    cards:
      | GenericPageQuery_genericPage_sections_tiles_tiles[]
      | null
      | undefined,
  ) => {
    return cards?.map((card, index) =>
      card?.body ? (
        <Card
          loadImage
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

  return (
    <>
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
        className="-mb-500"
      />
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {metaData?.name || pageTitle}
        </Heading>
      </div>
      {featured && (
        <div className="row:featured-left">
          <div className="blog-top-image">
            <ImageV2
              quality={70}
              optimisedHost
              lazyLoad={false}
              width={featured?.image?.file?.details.image.width}
              height={featured?.image?.file?.details.image.height}
              src={featured?.image?.file?.url || ''}
            />
          </div>
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
            <CarouselSwiper className="-mh-auto" countItems={5}>
              {renderCarouselCards(data?.topArticles)}
            </CarouselSwiper>
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
            <CarouselSwiper className="-mh-auto" countItems={5}>
              {renderCarouselCards(carousel.cards)}
            </CarouselSwiper>
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
                path={`/${metaData?.legacyUrl?.replace('.html', '') ||
                  metaData?.slug}/page`}
                pathForFirstPage={`/${metaData?.legacyUrl?.replace(
                  '.html',
                  '',
                ) || metaData?.slug}`}
                pathWithHtml={!!metaData?.legacyUrl}
                pages={pages}
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
