import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import SchemaJSON from 'core/atoms/schema-json';
import {
  GenericPageQuery_genericPage_sections_carousel_cards as ICaruselCard,
  GenericPageQuery,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import SectionCards from '../../components/SectionCards';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Carousel = dynamic(() => import('core/organisms/carousel'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={3} />,
  },
);

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
          {cards?.cards && <SectionCards cards={cards} />}
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
