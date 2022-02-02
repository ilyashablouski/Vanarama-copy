import React, { FC, useMemo } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import ArticleLink from '../../components/ArticleLink';
import BlogCarousel from '../../components/BlogCarousel';
import { convertHeadingToSlug } from '../../utils/markdownHelpers';
import { CarouselPositionEnum } from '../../models/IBlogsProps';
import useVehicleCarousel from '../../hooks/useVehicleCarousel';

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

const COUNT_CARDS = 9;
interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  image: string | null | undefined;
  articleUrl?: string;
  bodyLower?: string | null;
}

const LeasingArticleContainer: FC<IProps> = ({
  title,
  sections,
  image,
  body,
  articleUrl,
  bodyLower,
}) => {
  const cards = getSectionsData(['cards'], sections);

  const {
    carouselPosition,
    vehiclesList,
    title: blogCarouselTitle,
  } = useVehicleCarousel('guides', articleUrl);

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
        <Heading size="xlarge" color="black" tag="h1">
          {title}
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
              link: props => {
                const { href, children } = props;
                return <ArticleLink href={href}>{children}</ArticleLink>;
              },
              paragraph: props => <Text {...props} tag="p" color="darker" />,
              heading: props => (
                <Text
                  {...props}
                  id={convertHeadingToSlug(props)}
                  size="lead"
                  color="darker"
                  tag="h3"
                />
              ),
            }}
          />
          {carouselWithinBody && (
            <BlogCarousel
              countItems={COUNT_CARDS}
              vehiclesList={vehiclesList}
              className="carousel-two-column"
              title={blogCarouselTitle}
            />
          )}
          <ReactMarkdown
            allowDangerousHtml
            source={bodyLower || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <ArticleLink href={href}>{children}</ArticleLink>;
              },
              paragraph: props => <Text {...props} tag="p" color="darker" />,
              heading: props => (
                <Text
                  {...props}
                  id={convertHeadingToSlug(props)}
                  size="lead"
                  color="darker"
                  tag="h3"
                />
              ),
            }}
          />
        </article>
        <div>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                cards?.titleTag || 'span',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {cards?.name}
          </Heading>
          {cards?.cards?.map((el: Cards, ind: number) => (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={`${el?.title}_${el?.name || ind}`}
              title={{
                title: el?.title || '',
              }}
              imageSrc={el.image?.file?.url}
              description={el?.body || ''}
            >
              <RouterLink
                classNames={{ color: 'teal' }}
                link={{
                  href: el.link?.legacyUrl || el.link?.url || '',
                  label: el.link?.text || '',
                }}
              >
                {el.link?.text}
              </RouterLink>
            </Card>
          ))}
        </div>
      </div>
      {carouselAboveFooter && (
        <div className="row:bg-lighter blog-carousel-wrapper">
          <BlogCarousel
            countItems={COUNT_CARDS}
            vehiclesList={vehiclesList}
            title={blogCarouselTitle}
          />
        </div>
      )}
      <div className="row:comments" />
    </>
  );
};

export default LeasingArticleContainer;
