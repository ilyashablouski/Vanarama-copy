import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import {
  GenericPageQuery_genericPage_sections_cards_cards as ICard,
  GenericPageQuery_genericPage_sections_carousel_cards as ICaruselCard,
  GenericPageQuery,
} from '../../../generated/GenericPageQuery';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink/RouterLink';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { getSectionsData } from '../../utils/getSectionsData';

interface IProps {
  data: GenericPageQuery;
}

const renderCarouselCards = (cards: (ICaruselCard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <Card
        key={card.name}
        title={{ title: card?.title }}
        imageSrc={card.image?.file?.url}
      >
        <Text size="regular" color="dark">
          {card.body || ''}
        </Text>
        <Button
          fill="clear"
          color="teal"
          size="regular"
          label={card?.link?.text}
          onClick={() => {
            Router.push(card?.link?.url || '');
          }}
        />
      </Card>
    ) : null,
  );

const renderCards = (cards: (ICard | null)[] | undefined | null) =>
  cards?.map(card =>
    card?.title && card.name ? (
      <Card
        key={card.name || undefined}
        imageSrc={card.image?.file?.url}
        title={{
          className: '-flex-h',
          link: (
            <Heading
              size="lead"
              color="black"
              tag={
                (getTitleTag(card.titleTag) as keyof JSX.IntrinsicElements) ||
                'a'
              }
              href={card.link?.url || ''}
            >
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

const LeasingExplainedContainer: FC<IProps> = ({ data }) => {
  const body = getSectionsData(['body'], data?.genericPage);
  const title = getSectionsData(['metaData', 'name'], data?.genericPage);

  const carousel = getSectionsData(['sections', 'carousel'], data?.genericPage);
  const cards = getSectionsData(['sections', 'cards'], data?.genericPage);

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
        <ReactMarkdown
          escapeHtml={false}
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
          }}
        />
      </div>
      <div className="row:bg-lighter">
        <div className="row:carousel">
          <Heading size="large" color="black">
            {carousel?.title || ''}
          </Heading>
          {carousel?.cards && (
            <Carousel className="-col3" countItems={3}>
              {renderCarouselCards(carousel?.cards)}
            </Carousel>
          )}
        </div>
      </div>
      <div className="row:bg-lighter">
        <div className="row:cards-3col">
          <Heading size="large" color="black">
            {cards?.name || ''}
          </Heading>
          {renderCards(cards?.cards)}
        </div>
      </div>
    </>
  );
};

export default LeasingExplainedContainer;
