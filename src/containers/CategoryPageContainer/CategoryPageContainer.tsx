/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import ReactMarkdown from 'react-markdown';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink/RouterLink';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { ICategoryPage } from './interface';
import {
  GenericPageQuery_genericPage_sections_carousel_cards,
  GenericPageQuery_genericPage_sections_tiles_tiles,
} from '../../../generated/GenericPageQuery';

const renderCarouselCards = (
  cards: (GenericPageQuery_genericPage_sections_carousel_cards | null)[],
) =>
  cards.map(
    (card, index) =>
      card && (
        <Card
          key={`${card.title}_${index.toString()}_${card.body}`}
          className="card__article"
          imageSrc={card.image?.file?.url || ''}
          title={{
            title: '',
            link: (
              <RouterLink
                link={{ href: '#', label: card.title || '' }}
                className="card--link"
                classNames={{ color: 'black', size: 'regular' }}
              />
            ),
          }}
        >
          <ReactMarkdown
            escapeHtml={false}
            source={card.body || ''}
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
        </Card>
      ),
  );

const CategoryPageContainer: React.FC<ICategoryPage> = ({
  carousel,
  metaData,
  featured,
  tiles,
}) => {
  const [activePage, setActivePage] = useState(1);
  // for articles
  const cards = !tiles?.tiles?.length ? [] : [];

  const countPages = () => Math.ceil((cards?.length || 0) / 3);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const renderCards = () => {
    const indexOfLastOffer = activePage * 3;
    const indexOfFirstOffer = indexOfLastOffer - 3;
    // we get the right amount of cards for the current page
    const showCards =
      tiles?.tiles ||
      (cards as GenericPageQuery_genericPage_sections_tiles_tiles[]).slice(
        indexOfFirstOffer,
        indexOfLastOffer,
      );
    return showCards?.map(card =>
      card?.title ? (
        <Card
          key={card.title || undefined}
          imageSrc={card.image?.file?.url}
          title={{
            className: '-flex-h',
            link: (
              <Heading size="lead" color="black" tag="a" href={card.link || ''}>
                {card.title}
              </Heading>
            ),
            title: card.title || '',
            withBtn: true,
          }}
          description={card.body || ''}
        />
      ) : null,
    );
  };

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading tag="h1" size="xlarge" color="black">
          {metaData?.name}
        </Heading>
      </div>
      {featured && (
        <div className="row:featured-left">
          <Image src={featured?.image?.file?.url || ''} />
          <div>
            <Heading size="large" color="black">
              {featured?.title}
            </Heading>
            <ReactMarkdown
              escapeHtml={false}
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
      {carousel && carousel?.cards?.length && (
        <div className="row:bg-lighter -col-300">
          <Heading className="-a-center" tag="h3" size="large" color="black">
            {carousel.title}
          </Heading>
          <Carousel className="-mh-auto" countItems={5}>
            {renderCarouselCards(carousel.cards)}
          </Carousel>
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
            {renderCards()}
          </div>
          {!tiles && cards.length && (
            <div className="row:pagination">
              <Pagination
                path=""
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
    </>
  );
};

export default CategoryPageContainer;
