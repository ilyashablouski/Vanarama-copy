import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import {
  GenericPageQuery_genericPage_sections_cards_cards,
  GenericPageQuery_genericPage_sections_featured,
} from '../../../generated/GenericPageQuery';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={3} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  name: string | null | undefined;
  cards?:
    | (GenericPageQuery_genericPage_sections_cards_cards | null)[]
    | null
    | undefined;
  breadcrumbsItems?: any;
  featured?: GenericPageQuery_genericPage_sections_featured | null | undefined;
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

const PageNotFoundContainer: NextPage<IProps> = ({
  name,
  featured,
  breadcrumbsItems,
  cards,
}) => {
  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
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
            allowDangerousHtml
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
    </>
  );
};

export default PageNotFoundContainer;
