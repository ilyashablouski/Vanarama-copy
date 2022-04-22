import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery_genericPage_sections_cards_cards } from '../../../generated/GenericPageQuery';
import { GenericPageHeadQuery_genericPage_metaData } from '../../../generated/GenericPageHeadQuery';
import Head from '../../components/Head/Head';
import { BlogPosts_blogPosts_articles } from '../../../generated/BlogPosts';
import { setSource } from '../../utils/url';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { convertHeadingToSlug } from '../../utils/markdownHelpers';
import ArticleLink from '../../components/ArticleLink';
import {
  IMarkdownHeading,
  IMarkdownImage,
  IMarkdownLink,
  IMarkdownParagraph,
} from '../../types/markdown';
import BlogCarousel from '../../components/BlogCarousel';
import { Nullish } from '../../types/common';
import { CarouselPositionEnum } from '../../models/IBlogsProps';
import { IBreadcrumbLink } from '../../types/breadcrumbs';
import useVehicleCarousel from '../../hooks/useVehicleCarousel';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Media = dynamic(() => import('core/atoms/media'), {
  ssr: false,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

const COUNT_CARDS = 9;

export const renderHeading = (props: IMarkdownHeading) =>
  React.createElement(
    `h${props.level}`,
    { id: convertHeadingToSlug(props) },
    props.children,
  );

export const renderLink = (props: IMarkdownLink) => (
  <ArticleLink href={props.href}>{props.children}</ArticleLink>
);

export const renderImage = (props: IMarkdownImage) => (
  <img
    width="90%"
    src={props.src}
    alt={props.alt}
    style={{
      margin: '1rem auto',
      display: 'block',
    }}
  />
);

export const renderParagraph = (props: IMarkdownParagraph) => {
  const { children } = props;
  const isChangeToIframe = children.filter((el: any) =>
    el.props.value?.match('<a'),
  );

  if (isChangeToIframe.length) {
    const iframeSrc = isChangeToIframe[0].props.value
      .split('href="')[1]
      .split('"')[0];
    return <Media src={iframeSrc || ''} width="100%" height="360px" />;
  }

  return <Text {...props} tag="p" color="darker" />;
};

interface IProps {
  body: string | null | undefined;
  bodyLower?: string | null;
  name: string | null | undefined;
  image: string | null | undefined;
  cards?:
    | (GenericPageQuery_genericPage_sections_cards_cards | null)[]
    | null
    | undefined;
  breadcrumbsItems?: Nullish<IBreadcrumbLink[]>;
  metaData?: GenericPageHeadQuery_genericPage_metaData | null | undefined;
  articles?: (BlogPosts_blogPosts_articles | null)[] | null | undefined;
  articleUrl?: string;
}

const BlogPostContainer: NextPage<IProps> = ({
  body,
  bodyLower,
  name,
  image,
  breadcrumbsItems,
  metaData,
  articles,
  articleUrl,
}) => {
  const { carouselPosition, vehiclesList, title } = useVehicleCarousel(
    'blog',
    articleUrl,
  );

  const { carouselWithinBody, carouselAboveFooter } = useMemo(() => {
    return {
      carouselWithinBody: carouselPosition?.includes(
        CarouselPositionEnum.withinBody,
      ),
      carouselAboveFooter: carouselPosition?.includes(
        CarouselPositionEnum.aboveFooter,
      ),
    };
  }, [carouselPosition]);

  return (
    <>
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {name || ''}
        </Heading>
      </div>
      <div className="row:bg-white -compact">
        <div className="row:featured-image">
          {image && (
            <ImageV2
              quality={70}
              optimisedHost
              lazyLoad={false}
              className="-white"
              size="expand"
              src={image}
            />
          )}
        </div>
      </div>
      <div className="row:article">
        <article className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={body || ''}
            renderers={{
              link: renderLink,
              heading: renderHeading,
              paragraph: renderParagraph,
              image: renderImage,
            }}
          />
          {carouselWithinBody && (
            <BlogCarousel
              countItems={COUNT_CARDS}
              vehiclesList={vehiclesList}
              title={title}
              className="carousel-two-column"
            />
          )}
          <ReactMarkdown
            allowDangerousHtml
            source={bodyLower || ''}
            renderers={{
              link: renderLink,
              heading: renderHeading,
              paragraph: renderParagraph,
              image: renderImage,
            }}
          />
        </article>
        <div>
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            {articles && (
              <Heading tag="span" size="large" color="black">
                Related Articles
              </Heading>
            )}
            {articles?.map((el, index) => {
              const hrefLink = setSource((el?.legacyUrl || el?.slug) ?? '');
              return (
                <Card
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  key={`${el?.name}_${index.toString()}`}
                  className="card__article"
                  imageSrc={el?.featuredImage?.file?.url || ''}
                  title={{
                    title: '',
                    link: (
                      <RouterLink
                        withoutDefaultClassName
                        className="heading"
                        classNames={{ color: 'black', size: 'lead' }}
                        link={{
                          href: hrefLink,
                          label: el?.name || '',
                        }}
                      >
                        {el?.name}
                      </RouterLink>
                    ),
                  }}
                  description={el?.excerpt || ''}
                >
                  <RouterLink
                    classNames={{ color: 'teal', size: 'regular' }}
                    link={{
                      label: 'Read More',
                      href: hrefLink,
                    }}
                  />
                </Card>
              );
            })}
          </LazyLoadComponent>
        </div>
      </div>
      {carouselAboveFooter && (
        <div className="row:bg-lighter blog-carousel-wrapper">
          <BlogCarousel
            countItems={COUNT_CARDS}
            vehiclesList={vehiclesList}
            title={title}
          />
        </div>
      )}
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          {metaData.schema && (
            <SchemaJSON json={JSON.stringify(metaData.schema)} />
          )}
        </>
      )}
      <Script
        strategy="afterInteractive"
        src="https://www.riddle.com/files/js/embed.js"
      />
    </>
  );
};

export default BlogPostContainer;
