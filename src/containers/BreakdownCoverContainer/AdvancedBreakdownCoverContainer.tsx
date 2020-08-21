import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink/RouterLink';
import {
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections as Section,
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1 as Featured1Type,
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2 as Featured2Type,
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3 as Featured3Type,
} from '../../../generated/advancedBreakdownCoverPage';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
}

const AdvancedBreakdownCoverContainer: FC<IProps> = ({
  title,
  body,
  sections,
}) => {
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
          source={body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return <RouterLink link={{ href, label: children }} />;
            },
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

function getFeaturedHtml(
  featured: Featured1Type | Featured2Type | Featured3Type | null | undefined,
) {
  const featuredClass = getFeaturedClassPartial(featured);
  const imageFirst = featuredClass === 'featured-left';
  return (
    <>
      {featured && (
        <section className={`row:${featuredClass}`}>
          {imageFirst && (
            <div>
              {featured.image?.file?.url && (
                <Image
                  src={featured.image?.file?.url}
                  alt={featured.image?.file?.fileName}
                />
              )}
            </div>
          )}
          <div>
            <Heading
              color="black"
              size="lead"
              tag={featured.titleTag as keyof JSX.IntrinsicElements}
            >
              {featured.title}
            </Heading>
            <Text color="darker" size="regular">
              <ReactMarkdown
                source={featured.body?.replace(/\n/gi, '&nbsp;\n') || ''}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                }}
              />
            </Text>
          </div>
          {!imageFirst && (
            <div>
              {featured.image?.file?.url && (
                <Image
                  src={featured.image?.file?.url}
                  alt={featured.image?.file?.fileName}
                />
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default AdvancedBreakdownCoverContainer;
