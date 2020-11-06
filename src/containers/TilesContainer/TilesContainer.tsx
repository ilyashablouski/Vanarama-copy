import { gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import FCWithFragments from '../../utils/FCWithFragments';
import { GenericPageQueryTiles } from '../../../generated/GenericPageQueryTiles';

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
