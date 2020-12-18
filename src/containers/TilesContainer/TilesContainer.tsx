import { gql } from '@apollo/client';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import FCWithFragments from '../../utils/FCWithFragments';
import { GenericPageQueryTiles } from '../../../generated/GenericPageQueryTiles';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  tiles: GenericPageQueryTiles;
  leasingOffers?: boolean;
}

const TilesContainer: FCWithFragments<IProps> = ({ tiles, leasingOffers }) => {
  return (
    <section className="row:bg-light">
      <div>
        <Heading
          color="black"
          size="large"
          tag={
            getTitleTag(tiles.titleTag || 'h1') as keyof JSX.IntrinsicElements
          }
        >
          {tiles.tilesTitle}
        </Heading>
        {tiles?.tiles?.length && (
          <div className="row:cards-2col" style={{ paddingTop: '10px' }}>
            {tiles?.tiles.map(
              (el, idx) =>
                (el.title || el.body) && (
                  <Card
                    optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                    inline
                    key={el.title || idx}
                    imageSrc={el.image?.file?.url || ''}
                    title={{
                      title: el.title || '',
                    }}
                    className={leasingOffers ? '' : 'breakdown'}
                  >
                    <div>
                      <ReactMarkdown
                        allowDangerousHtml
                        source={el.body || ''}
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
                            <Text
                              {...props}
                              size="lead"
                              color="dark"
                              tag="h3"
                            />
                          ),
                          paragraph: props => (
                            <Text {...props} tag="p" color="dark" />
                          ),
                        }}
                      />
                      {el.link && (
                        <RouterLink
                          classNames={{ color: 'teal', size: 'regular' }}
                          link={{
                            label: el.link?.text || '',
                            href: el.link.legacyUrl || el.link?.url || '',
                          }}
                        />
                      )}
                    </div>
                  </Card>
                ),
            )}
          </div>
        )}
      </div>
    </section>
  );
};

TilesContainer.fragments = {
  tiles: gql`
    fragment GenericPageQueryTiles on Tiles {
      position
      name
      tilesTitle
      titleTag
      tiles {
        body
        title
        link {
          text
          url
          legacyUrl
        }
        image {
          title
          description
          file {
            url
            fileName
            contentType
          }
        }
      }
    }
  `,
};

export default TilesContainer;
