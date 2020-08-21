import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import { getFeaturedClassPartial } from '../../utils/layout';
import {
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections as Section,
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3,
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1,
  advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2,
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
              <div className="row:cards-2col">
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
        <ReactMarkdown source={body || ''} />
      </div>
      {featured1Html}
      {tilesHtml}
      {featured2Html}
      {featured3Html}
    </>
  );
};

export default AdvancedBreakdownCoverContainer;
function getFeaturedHtml(
  featured3:
    | advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured1
    | advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured2
    | advancedBreakdownCoverPage_advancedBreakdownCoverPage_sections_featured3
    | null
    | undefined,
) {
  const featuredClass = getFeaturedClassPartial(featured3);
  const imageFirst = featuredClass == 'featured-left';
  return (
    <>
      {featured3 && (
        <section className={`row:${featuredClass}`}>
          {imageFirst && (
            <div>
              {featured3.image?.file?.url && (
                <Image
                  src={featured3.image?.file?.url}
                  alt={featured3.image?.file?.fileName}
                />
              )}
            </div>
          )}
          <div>
            <Heading
              color="black"
              size="large"
              tag={featured3.titleTag as keyof JSX.IntrinsicElements}
            >
              {featured3.title}
            </Heading>
            <Text color="darker" size="regular">
              <ReactMarkdown
                source={featured3.body?.replace(/\n/gi, '&nbsp;\n') || ''}
              />
            </Text>
          </div>
          {!imageFirst && (
            <div>
              {featured3.image?.file?.url && (
                <Image
                  src={featured3.image?.file?.url}
                  alt={featured3.image?.file?.fileName}
                />
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
}
