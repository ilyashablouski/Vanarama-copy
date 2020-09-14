import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery_genericPage_sections as Section } from '../../../generated/GenericPageQuery';
import getFeaturedHtml from './getFeaturedHtml';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const VanaramaSmilesContainer: FC<IProps> = ({ title, body, sections }) => {
  const featured1 = sections?.featured1;
  const tiles = sections?.tiles;
  const featured2 = sections?.featured2;
  const featured3 = sections?.featured3;

  const featured1Html = getFeaturedHtml(featured1);
  const featured2Html = getFeaturedHtml(featured2);
  const featured3Html = getFeaturedHtml(featured3);

  const tilesHtml = (
    <>
      {tiles && (
        <section className="row:bg-light">
          <div>
            <Heading
              color="black"
              size="large"
              tag={tiles.titleTag as keyof JSX.IntrinsicElements}
            >
              {tiles.tilesTitle}
            </Heading>
            {tiles?.tiles?.length && (
              <div className="row:cards-2col" style={{ paddingTop: '10px' }}>
                {tiles?.tiles.map((el, idx) => (
                  <Card
                    inline
                    key={el.title || idx}
                    imageSrc={el.image?.file?.url || ''}
                    title={{
                      title: el.title || '',
                      description: el.body || '',
                    }}
                    className="breakdown"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
  return (
    <>
      <div className="row:title">
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
            heading: props => (
              <Text {...props} size="lead" color="darker" className="-mt-100" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </div>
      {featured1Html}
      {tilesHtml}
      {featured2Html}
      {featured3Html}
    </>
  );
};

export default VanaramaSmilesContainer;
