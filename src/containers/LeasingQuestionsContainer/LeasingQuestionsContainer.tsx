import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import ReactMarkdown from 'react-markdown';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import {
  GenericPageQuery_genericPage_sections_cards_cards as ICard,
  GenericPageQuery_genericPage_sections_carousel_cards as ICaruselCard,
  GenericPageQuery,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Head from '../../components/Head/Head';

interface IProps {
  data: GenericPageQuery;
}

const renderCarouselCards = (cards: (ICaruselCard | null)[]) =>
  cards.map(card =>
    card?.title && card.body && card.name ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={card.name}
        title={{ title: card?.title }}
        imageSrc={card.image?.file?.url}
      >
        <Text size="regular" color="dark">
          {card.body || ''}
        </Text>
        <RouterLink
          classNames={{ color: 'teal', solid: true, size: 'regular' }}
          className="button"
          link={{
            href: card.link?.legacyUrl || card.link?.url || '',
            label: card?.link?.text || '',
          }}
        >
          <div className="button--inner">{card.link?.text}</div>
        </RouterLink>
      </Card>
    ) : null,
  );

const renderCards = (cards: (ICard | null)[] | undefined | null) =>
  cards?.map(card =>
    card?.title && card.name ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={card.name || undefined}
        imageSrc={card.image?.file?.url}
        title={{
          className: '-flex-h',
          link: (
            <RouterLink
              withoutDefaultClassName
              className="heading"
              classNames={{ color: 'black', size: 'lead' }}
              link={{
                href: card.link?.legacyUrl || card.link?.url || '',
                label: card.title || '',
              }}
            >
              {card.title}
            </RouterLink>
          ),
          title: '',
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
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
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
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default LeasingExplainedContainer;
