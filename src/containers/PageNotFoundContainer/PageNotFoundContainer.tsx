/* eslint-disable @typescript-eslint/camelcase */
import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import {
  GenericPageQuery_genericPage_sections_cards_cards,
  GenericPageQuery_genericPage_sections_featured,
} from '../../../generated/GenericPageQuery';
import { GenericPageHeadQuery_genericPage_metaData } from '../../../generated/GenericPageHeadQuery';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import getTitleTag from '../../utils/getTitleTag';

interface IProps {
  name: string | null | undefined;
  cards?:
    | (GenericPageQuery_genericPage_sections_cards_cards | null)[]
    | null
    | undefined;
  breadcrumbsItems?: any;
  featured?: GenericPageQuery_genericPage_sections_featured | null | undefined;
  metaData?: GenericPageHeadQuery_genericPage_metaData | null | undefined;
}

const renderCards = (
  cards: (GenericPageQuery_genericPage_sections_cards_cards | null)[],
) =>
  cards?.map(card =>
    card?.title && card.name ? (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={card.name || undefined}
        imageSrc={card.image?.file?.url}
        title={{
          className: '-flex-h',
          link: (
            <Heading
              size="lead"
              color="black"
              tag={
                getTitleTag(card.titleTag || 'a') as keyof JSX.IntrinsicElements
              }
              href={card.link?.url || ''}
            >
              {card.title}
            </Heading>
          ),
          title: card.name || '',
          withBtn: true,
        }}
        description={card.body || ''}
      />
    ) : null,
  );

const PageNotFoundContainer: NextPage<IProps> = ({
  name,
  featured,
  breadcrumbsItems,
  metaData,
  cards,
}) => {
  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black">
          {name || ''}
        </Heading>
      </div>
      <div className="row:featured-left">
        <div className="lazyload-wrapper">
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            className="-white"
            size="expand"
            src={featured?.image?.file?.url || ''}
          />
        </div>
        <div className="full-height">
          <ReactMarkdown
            escapeHtml={false}
            source={featured?.body || ''}
            renderers={{
              paragraph: props => (
                <Text {...props} size="lead" tag="p" color="darker" />
              ),
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
      </div>
      <div className="row:bg-lighter -col-300">
        <div className="row:cards-3col">{cards && renderCards(cards)}</div>
      </div>
      {metaData && <Head metaData={metaData} featuredImage={null} />}
    </>
  );
};

export default PageNotFoundContainer;
