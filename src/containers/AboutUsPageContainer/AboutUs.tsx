import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import CarouselSwiper from 'core/organisms/carousel';
import { SwiperSlide } from 'swiper/react';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import { ABOUT_US_MEET_SECTION_NAMES } from './config';
import {
  GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards as ICard,
  GetAboutUsPageData as Query,
} from '../../../generated/GetAboutUsPageData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import getTitleTag from '../../utils/getTitleTag';

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
const TrophySharp = dynamic(() => import('core/assets/icons/TrophySharp'), {
  ssr: false,
});
const ArrowForwardSharp = dynamic(
  () => import('core/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});

export interface IAboutPageProps {
  data: Query;
  serviceBanner?: IServiceBanner;
  children?: ReactNode;
}

const renderCarouselCards = (cards: (ICard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <SwiperSlide key={card.name}>
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          style={{ maxHeight: 320 }}
          title={{
            title: card.title,
            link: (
              <Heading
                size="lead"
                color="black"
                tag={getTitleTag(card.titleTag) as keyof JSX.IntrinsicElements}
              >
                <Icon icon={<TrophySharp />} color="black" size="regular" />
                {` ${card.title}`}
              </Heading>
            ),
          }}
          description={card.body}
        />
      </SwiperSlide>
    ) : null,
  );

const renderMeetCard = (card: ICard | undefined) =>
  (card?.title && card.body && (
    <Card
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      title={{
        title: card.title,
        link: (
          <Heading
            size="lead"
            color="black"
            tag={getTitleTag(card.titleTag) as keyof JSX.IntrinsicElements}
          >
            {card.title}
          </Heading>
        ),
      }}
    >
      <div>
        <ReactMarkdown
          allowDangerousHtml
          source={card.body}
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
      </div>
    </Card>
  )) ||
  null;

const AboutUs: React.FC<IAboutPageProps> = ({ data }) => {
  const { metaData, sections, featuredImage, body } = data.aboutUsLandingPage;

  const directorsCard = sections?.cards?.cards?.find(
    card => card.name === ABOUT_US_MEET_SECTION_NAMES.directors,
  );
  const teamCard = sections?.cards?.cards?.find(
    card => card.name === ABOUT_US_MEET_SECTION_NAMES.team,
  );

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {metaData.name}
        </Heading>
      </div>
      <div className="row:bg-white -compact">
        <div className="row:featured-image">
          {featuredImage?.file?.url && (
            <ImageV2
              quality={70}
              optimisedHost
              lazyLoad={false}
              src={featuredImage.file.url}
              alt="About Vanarama"
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
        </article>
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <div className="-pb-400">
            {sections?.carousel?.cards && (
              <CarouselSwiper
                countItems={1}
                className="carousel-one-column -mh-auto about-us"
              >
                {renderCarouselCards(sections?.carousel.cards)}
              </CarouselSwiper>
            )}
          </div>
        </LazyLoadComponent>
      </div>
      <div className="row:cards-2col">
        {renderMeetCard(directorsCard)}
        {renderMeetCard(teamCard)}
      </div>
      <div className="row:centered">
        <Heading size="lead" color="black">
          {sections?.rowText?.heading || ''}
        </Heading>
        <RouterLink
          link={{
            href: sections?.rowText?.rowTextLink?.url || '',
            label: sections?.rowText?.rowTextLink?.text || '',
          }}
          classNames={{
            color: 'teal',
          }}
        >
          {sections?.rowText?.rowTextLink?.text}{' '}
          <Icon
            icon={<ArrowForwardSharp />}
            className="md hydrated"
            size="xsmall"
          />
        </RouterLink>
      </div>
    </>
  );
};

export default AboutUs;
