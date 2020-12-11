import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';
import { ApolloError } from '@apollo/client';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import { ABOUT_US_MEET_SECTION_NAMES } from './config';
import {
  GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards as ICard,
  GetAboutUsPageData as Query,
} from '../../../generated/GetAboutUsPageData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={5} />,
  },
);
const TrophySharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/TrophySharp'),
  {
    ssr: false,
  },
);
const ArrowForwardSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ArrowForwardSharp'),
  {
    ssr: false,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
// const Carousel = dynamic(
//   () => import('@vanarama/uibook/lib/components/organisms/carousel'),
//   {
//     loading: () => <Skeleton count={3} />,
//   },
// );
const Link = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/link'),
);

export interface IAboutPageProps {
  error: ApolloError | undefined;
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
        // TODO: remove width when Carousel component is fixed
        // now its slider is wider than carousel itself, and cards adapts and its right border is hidden
        style={{ width: '362px' }}
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

const AboutUs: React.FC<IAboutPageProps> = ({ loading, error, data }) => {
  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
      <div className="row:bg-black -compact">
        <div className="row:featured-image">
          {featuredImage?.file?.url && (
            <Image
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
        <div>
          <div className="-pb-400">
            {sections?.carousel?.cards && (
              <Carousel countItems={1}>
                {renderCarouselCards(sections?.carousel.cards)}
              </Carousel>
            )}
          </div>
        </div>
      </div>
      <div className="row:cards-2col">
        {renderMeetCard(directorsCard)}
        {renderMeetCard(teamCard)}
      </div>
      <div className="row:centered">
        <Heading size="lead" color="black">
          {sections?.rowText?.heading || ''}
        </Heading>
        <Link color="teal" href="#">
          <ReactMarkdown
            allowDangerousHtml
            source={sections?.rowText?.body || ''}
            renderers={{
              paragraph: props => <React.Fragment {...props} />,
              link: props => {
                const { href, children } = props;
                return (
                  <RouterLink
                    link={{ href, label: children }}
                    classNames={{ color: 'teal' }}
                  />
                );
              },
            }}
          />{' '}
          <Icon
            icon={<ArrowForwardSharp />}
            className="md hydrated"
            size="xsmall"
          />
        </Link>
      </div>
    </>
  );
};

export default AboutUs;
