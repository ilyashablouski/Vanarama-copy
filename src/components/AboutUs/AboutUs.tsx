import React from 'react';
import ReactMarkdown from 'react-markdown';

import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { ILink } from '@vanarama/uibook/lib/interfaces/link';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import TrophySharp from '@vanarama/uibook/lib/assets/icons/TrophySharp';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';

import Link from '@vanarama/uibook/lib/components/atoms/link';
import { useAboutUsPageData } from './gql';
import {
  ABOUT_US_NAV_ITEM,
  ABOUT_US_MEET_SECTION_NAMES,
  ABOUT_US_STRINGS,
} from './config';
import { GetAboutUsPageData_aboutUsLandingPage_sections_carousel_cards as ICard } from '../../../generated/GetAboutUsPageData';

const AboutUs: React.FC = () => {
  const renderCarouselCards = (cards: (ICard | null)[]) =>
    cards.map(card =>
      // TODO: uncomment and remove placeholders when actual data arrives
      card /* ?.title && card.body && card.name */ ? (
        <Card
          // style={{ width: "362px" }}
          key={card.name || undefined}
          title={{
            title: card.title || 'Award title',
            link: (
              <Heading size="lead" color="black">
                <Icon icon={<TrophySharp />} color="black" />{' '}
                {card.title || 'TODO: Award title'}
              </Heading>
            ),
          }}
          description={
            card.body ||
            'TODO: add text instead of Award description Award description Award description Award description Award description Award description Award description'
          }
        />
      ) : null,
    );

  const renderMeetCard = (card: ICard | null) =>
    (card?.title && card.body && (
      <Card title={{ title: card.title }}>
        <ReactMarkdown
          source={card.body}
          renderers={{ link: props => <Link {...props} /> }}
        />
      </Card>
    )) ||
    null;

  const { data, error, loading } = useAboutUsPageData();

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  const { metaData, sections } = data.aboutUsLandingPage;

  const navigation: ILink[] = metaData.schema.itemListElement.map(
    (nav: any) => ({
      href: nav.item,
      label: nav.name,
    }),
  );

  const directorsCard =
    sections.cards?.cards?.find(
      card => card.name === ABOUT_US_MEET_SECTION_NAMES.directors,
    ) || null;
  const teamCard =
    sections.cards?.cards?.find(
      card => card.name === ABOUT_US_MEET_SECTION_NAMES.team,
    ) || null;

  return (
    <>
      <div className="row:title">
        <nav>
          <Breadcrumb
            dataTestId="about-us-nav"
            items={navigation.concat(ABOUT_US_NAV_ITEM)}
          />
        </nav>
        <Heading size="xlarge" color="black">
          {metaData.name}
        </Heading>
      </div>
      <div className="row:bg-black -compact">
        <div className="row:featured-image">
          <Image
            // TODO: from contentful
            src="https://source.unsplash.com/collection/2102317/1800x800?sig=40341"
          />
          <Text tag="span" size="regular" color="inherit" className="-caption">
            {ABOUT_US_STRINGS.imageCredit.replace(
              '{{PERSON}}',
              'TODO: get name and image from contentful',
            )}
          </Text>
        </div>
      </div>
      <div className="row:article">
        <article className="markdown">
          <ReactMarkdown source={metaData.body || ''} />
        </article>
        <div>
          <div className="-pb-400">
            {sections.carousel?.cards && (
              <Carousel countItems={1}>
                {renderCarouselCards(sections.carousel.cards)}
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
          {sections.rowText?.heading || ''}
        </Heading>
        <Link color="teal" href="#">
          <ReactMarkdown
            source={sections.rowText?.body || ''}
            renderers={{
              paragraph: props => <React.Fragment {...props} />,
            }}
          />{' '}
          <Icon
            icon={<ArrowForwardSharp />}
            className="md hydrated"
            size="small"
          />
        </Link>
      </div>
    </>
  );
};

export default AboutUs;
