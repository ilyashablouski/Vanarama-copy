import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import Carousel from 'core/organisms/carousel';
import { ABOUT_US_MEET_SECTION_NAMES } from './config';
import {
  GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards as ICard,
  GetAboutUsPageData as Query,
} from '../../../generated/GetAboutUsPageData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
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
  loading: boolean;
  data: Query;
  children?: ReactNode;
}

const prepareTagName = (possibleTag: string | null) =>
  possibleTag && Heading.defaultProps?.tag?.indexOf(possibleTag) !== -1
    ? possibleTag
    : undefined;

const renderCarouselCards = (cards: (ICard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        style={{ maxHeight: 320 }}
        key={card.name}
        title={{
          title: card.title,
          link: (
            <Heading
              size="lead"
              color="black"
              tag={prepareTagName(card.titleTag) as any}
            >
              <Icon icon={<TrophySharp />} color="black" size="regular" />
              {` ${card.title}`}
            </Heading>
          ),
        }}
        description={card.body}
      />
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
            tag={prepareTagName(card.titleTag) as any}
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

const AboutUs: React.FC<IAboutPageProps> = ({ loading, data }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (!data) {
    return <></>;
  }

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
            <Image
              lazyLoad
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={featuredImage.file.url}
              alt="Featured image"
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
              <Carousel countItems={1} className="-mh-auto about-us">
                {renderCarouselCards(sections?.carousel.cards)}
              </Carousel>
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
            href: sections?.rowText?.link?.url || '',
            label: sections?.rowText?.link?.text || '',
          }}
          classNames={{ color: 'teal' }}
        >
          {sections?.rowText?.link?.text}{' '}
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
