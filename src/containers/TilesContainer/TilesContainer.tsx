import ReactMarkdown from 'react-markdown';
import React, { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { GenericPageQuery_genericPage_sections_tiles as Tiles } from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';

interface IProps {
  tiles: Tiles;
}

const TilesContainer: FC<IProps> = ({ tiles }) => {
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
            {tiles?.tiles.map((el, idx) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                inline
                key={el.title || idx}
                imageSrc={el.image?.file?.url || ''}
                title={{
                  title: el.title || '',
                }}
                className="breakdown"
              >
                <div className="">
                  <ReactMarkdown
                    escapeHtml={false}
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
                        <Text {...props} size="lead" color="dark" tag="h3" />
                      ),
                      paragraph: props => (
                        <Text {...props} tag="p" color="dark" />
                      ),
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TilesContainer;
