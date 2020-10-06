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
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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

const renderCards = (
  cards: GenericPageQuery_genericPage_sections_tiles_tiles[] | null | undefined,
) => {
  return cards?.map(card =>
    card?.body ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={card.title || undefined}
        imageSrc={card.image?.file?.url || ''}
        title={{
          className: '-flex-h',
          link: (
            <Heading size="lead" color="black" tag="a" href={card.link || ''}>
              {card?.title}
            </Heading>
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
  carousel,
  metaData,
  featured,
  pageTitle,
  articles,
  tiles,
}) => {
  const [activePage, setActivePage] = useState(1);

  const countPages = () => Math.ceil((articles?.length || 0) / 9);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const getBody = (body: string) => {
    const bodyShort = body.slice(0, 100);
    return `${bodyShort?.replace(/\**/g, '')}...`;
  };

  const renderArticles = () => {
    const indexOfLastOffer = activePage * 9;
    const indexOfFirstOffer = indexOfLastOffer - 9;
    // we get the right amount of cards for the current page
    const showCards = articles?.slice(indexOfFirstOffer, indexOfLastOffer);
    return showCards?.map(card =>
      card?.body ? (
        <Card
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          key={card?.body || undefined}
          imageSrc={card.featuredImage?.file?.url || ''}
          title={{
            className: '-flex-h',
            link: (
              <Heading size="lead" color="black" tag="a" href={card.slug || ''}>
                {card?.title}
              </Heading>
            ),
            title: '',
          }}
        >
          <div>
            <ReactMarkdown
              source={getBody(card?.body)}
              escapeHtml={false}
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
              href: card.slug || '',
            }}
          />
        </Card>
      ) : null,
    );
  };

  return (
    <>
      <div className="row:title">
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
            {renderCards(tiles?.tiles)}
          </div>
        </div>
      )}
      {articles && articles?.length && (
        <div className="row:bg-lighter -col-300">
          <div className="row:cards-3col">
            <Heading className="-a-center" tag="h3" size="large" color="black">
              Top Articles
            </Heading>
            {renderArticles()}
          </div>
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
        </div>
      )}
    </>
  );
};

export default CategoryPageContainer;
